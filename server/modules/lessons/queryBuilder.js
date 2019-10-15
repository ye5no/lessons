import AppError from '../../utils/AppErrors.js';
import { Op } from 'sequelize';
import Models from '../../models';
import Sequelize from 'sequelize';

export class QueryBuilder {
	constructor(query) {
		this.where = {};
		this.include = [
			{
				model: Models.students,
			},
			{
				model: Models.teachers,
			},
		];
		// this.attributes = ['id', [Sequelize.fn('COUNT', '*'), 'count']];
		this.order = [['id', 'ASC']];
		this.offset = 0;
		this.limit = 5;
		this.studentsCount = false;
		if (query.date) this.handleDate(query.date);
		if (query.status) this.handleStatus(query.status);
		if (query.teacherIds) this.handleTeachers(query.teacherIds);
		if (query.studentsCount) this.handleStudentsCount(query.studentsCount);
		if (query.lessonsPerPage) this.handleLessonsPerPage(query.lessonsPerPage);
		if (query.page) this.handlePage(query.page);
	}

	static visitCounter(lessons) {
		lessons.forEach(_lesson => {
			const lesson = _lesson.dataValues;
			lesson.visitCount = (lesson.students.filter(student => student.lesson_students.visit)).length;
		});
	}

	static reworkAnswer(lessons) {
		lessons.forEach(_lesson => {
			const lesson = _lesson.dataValues;
			lesson.students.forEach(_student => {
				const student = _student.dataValues;
				student.visit = student.lesson_students.visit;
				delete student.lesson_students;
			});
			lesson.teachers.forEach(_teacher => {
				const teacher = _teacher.dataValues;
				delete teacher.lesson_teachers;
			});
		});
	}

	static countFilter(lessons, studentsCount) {
		const result = [];
		const [min, max] = studentsCount;
		lessons.forEach(lesson => {
			const len = lesson.students.length;
			if (min <= len && len <= max) result.push(lesson.dataValues);
		});
		return result;
	}

	handleDate(_date) {
		const dates = _date.split(',').map(el => el.trim());
		switch (dates.length) {
			case 1:
				const date = new Date(dates[0]);
				if (date == 'Invalid Date') throw new AppError(400, 200);
				this.where.date = date;
				break;
			case 2:
				let min, max;
				min = new Date(dates[0]);
				max = new Date(dates[1]);
				if (min == 'Invalid Date' || max == 'Invalid Date') throw new AppError(400, 200);
				if (max < min) {
					const _max = max;
					max = min;
					min = _max;
				}
				this.where.date = {
					[Op.and]: [
						{[Op.gte]: min},
						{[Op.lte]: max},
					],
				};
				break;
			default:
				throw new AppError(400, 200);
		}
		// this.order = [['date', 'ASC']];
	}

	handleStatus(_status) {
		if (![0, 1].includes(+_status)) throw new AppError(400, 201);
		this.where.status = +_status;
	}

	handleTeachers(_teacherIds) {
		let valid = true;
		const teacherIds = _teacherIds.split(',').map(el => {
			const num = Number(el.trim());
			if (!Number.isInteger(num) || num < 1) valid = false;
			return num;
		});
		if (!valid) throw new AppError(400, 202);
		this.include[1].where = { id: { [Op.in]: teacherIds }};
	}

	handleStudentsCount(_studentsCount) {
		const counts = _studentsCount.split(',').map(el => el.trim());
		switch (counts.length) {
			case 1:
				const count = +counts[0];
				if (!Number.isInteger(count) || count < 0) throw new AppError(400, 203);
				this.studentsCount = [count, count];
				break;
			case 2:
				let min, max;
				min = +counts[0];
				max = +counts[1];
				if (!Number.isInteger(min) || min < 0 || !Number.isInteger(max) || max < 0) throw new AppError(400, 203);
				if (max < min) {
					const _max = max;
					max = min;
					min = _max;
				}
				this.studentsCount = [min, max];
				break;
			default:
				throw new AppError(400, 203);
		}
	}

	handleLessonsPerPage(_lessonsPerPage) {
		const lessonsPerPage = +_lessonsPerPage;
		if (!Number.isInteger(lessonsPerPage) || lessonsPerPage < 1) throw new AppError(400, 204);
		this.limit = lessonsPerPage;
	}

	handlePage(_page) {
		const page = +_page;
		if (!Number.isInteger(page) || page < 0) throw new AppError(400, 205);
		this.offset = this.limit * (page - 1);
	}

	getQuery() {
		return {
			where: this.where,
			include: this.include,
			order: this.order,
			offset: this.offset,
			limit: this.limit,
		};
	}
}
