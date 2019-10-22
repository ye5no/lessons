import Models from '../../models';
import sequelize from '../../utils/sequelize-connector';
import { QueryBuilder } from './queryBuilder';
import { Creator } from './creator';


export default {
	async list(ctx) {
		const { tableName } = ctx.params;
		let options = {};
		switch (tableName) {
			case 'LessonStudents':
				options.include = [Models.Lessons, Models.Students];
				break;
			case 'LessonTeachers':
				options.include = [Models.Lessons, Models.Teachers];
				break;
			case 'Lessons':
				options.attributes = ['title', 'date', 'status', 'id'].concat([
					[
						sequelize.literal(
							'(SELECT COUNT("student_id") FROM "lesson_students" WHERE "lesson_students"."lesson_id" = "Lessons"."id" AND "lesson_students"."visit" = true)'
						),
						'visitCount',
					],
				]);
				options.include = [{
					model: Models.Students,
				}, {
					model: Models.Teachers,
				}];
				break;
			case 'Students':
				options.include = [Models.Lessons];
				break;
			case 'Teachers':
				options.include = [Models.Lessons];
				break;
			default: options.include = [];
		}
		ctx.body = await Models[tableName].findAll(options);
	},

	async search(ctx) {
		const qbuilder = new QueryBuilder(ctx.query);
		const data = await Models.Lessons.findAll(qbuilder.getQuery());
		QueryBuilder.reworkAnswer(data);
		ctx.body = data;
	},

	async create(ctx) {
		const creator = new Creator(ctx.request.body);
		ctx.body = await creator.performCreationArray();
	},
};
