import AppError from '../../utils/AppErrors.js';
import { Op } from 'sequelize';
import Models from '../../models';

export class Creator {
	constructor(body) {
		this.teacherIds = null;
		this.title = null;
		this.days = null;
		this.firstDate = null;
		this.lessonsCount = null;
		this.lastDate = null;
		this.MAX_LENGTH = 52; // weeks;
		this.MAX_LESSONS = 300;
		const afterYear = new Date();
		afterYear.setDate(afterYear.getDate()+this.MAX_LENGTH*7);
		this.afterYear = afterYear;

		this.validateTeachersIds(body.teacherIds);
		this.validateTitle(body.title);
		this.validateDays(body.days);
		this.validateStart(body.firstDate);
		this.validateFinish(body.lessonsCount, body.lastDate);
	}

	validateTeachersIds(_teacherIds) {
		if (
			!_teacherIds ||
			!Array.isArray(_teacherIds) ||
			_teacherIds.length === 0 ||
			_teacherIds.some(el => !Number.isInteger(+el) || +el < 1)
		) throw new AppError(400, 300);
		this.teacherIds = _teacherIds.map(el => +el);
	}

	validateTitle(_title) {
		if (
			!_title ||
			_title.length > 255
	) throw new AppError(400, 301);
		this.title = _title;
	}

	validateDays(_days) {
		if (
			!_days ||
			!Array.isArray(_days) ||
			_days.length === 0 ||
			_days.some(el => ![0, 1, 2, 3, 4, 5, 6].includes(+el))
		) throw new AppError(400, 302);
		this.days = _days.map(el => +el).sort();
	}

	validateStart(_firstDate) {
		const firstDate = new Date(_firstDate);
		if (
			!_firstDate ||
			firstDate == 'Invalid Date' ||
			new Date() > firstDate
		) throw new AppError(400, 303);
		this.firstDate = firstDate;
	}

	validateFinish(_lessonsCount, _lastDate) {
		if (!_lessonsCount && !_lastDate) throw new AppError(400, 304);
		if (_lessonsCount) {
			if (
				_lastDate ||
				!Number.isInteger(+_lessonsCount) ||
				+_lessonsCount < 1 ||
				+_lessonsCount > this.MAX_LESSONS
			) throw new AppError(400, 304);
			this.lessonsCount = +_lessonsCount;
		}
		if (_lastDate) {
			const lastDate = new Date(_lastDate);
			if (
				_lessonsCount ||
			  lastDate == 'Invalid Date' ||
				lastDate > this.afterYear
			) throw new AppError(400, 304);
			this.lastDate = lastDate;
		}
	}

	async checkTeachers() {
		const teachers = await Models.teachers.findAll({ where: { id: { [Op.in]: this.teacherIds }}});
		return teachers.length === this.teacherIds.length;
	}

	getCreate() {
		return {
			teacherIds: this.teacherIds,
			title: this.title,
			days: this.days,
			firstDate: this.firstDate,
			lessonsCount: this.lessonsCount,
			lastDate: this.lastDate,
		};
	}

	_upDate(date, delta) {
		date.setDate(date.getDate() + delta);
		return date;
	}

	_getFirstDate() {
		const day = this.firstDate.getDay();
		let index = this.days.findIndex(el => el > day);
		let delta;
		if (index > -1) {
			delta = this.days[index] - day;
		} else {
			index = 0;
			delta = 7 - day + this.days[index];
		}
		return {
			index,
			date: this._upDate(new Date(this.firstDate.getTime()), delta),
		};
	}

	_nextDate(_index, date) {
		const index = (_index + 1 === this.days.length) ? 0 : _index + 1;
		const delta = (index > 0)
			? this.days[index] - this.days[_index]
			: 7 - this.days[_index] + this.days[index];
		return {
			index,
			date: this._upDate(date, delta),
		};
	}

	_whileCondition(date, counter) {
		if (this.lastDate) {
			return date <= this.lastDate && counter <= this.MAX_LESSONS;
		} else {
			return date <= this.afterYear && counter <= this.lessonsCount;
		}
	}

	async performCreationArray() {
		if (!await this.checkTeachers()) throw new AppError(400, 305);
		const result = [];
		let currentLesson = this._getFirstDate();
		let counter = 1;
		// console.log(currentLesson, counter);
		while (this._whileCondition(currentLesson.date, counter)) {
			const lesson = await Models.lessons.create({
				title: this.title,
				date: new Date(currentLesson.date.getTime()),
				status: 0,
			});
			result.push(lesson.id);
			await Promise.all(this.teacherIds.map(teacher_id => Models.lessonTeachers.create({
				lesson_id: lesson.id,
				teacher_id,
			})));
			currentLesson = this._nextDate(currentLesson.index, currentLesson.date);
			counter++;
			// console.log(currentLesson, counter);
		}
		return result;
	}
}
