import AppError from '../../utils/AppErrors.js';
import Models from '../../models';
import { QueryBuilder } from './queryBuilder';
import { Creator } from './creator';

export default {
	async list(ctx) {
		const { tableName } = ctx.params;
		let include;
		switch (tableName) {
			case 'lessonStudents':
				include = [Models.lessons, Models.students];
				break;
			case 'lessonTeachers':
				include = [Models.lessons, Models.teachers];
				break;
			case 'lessons':
				include = [Models.students, Models.teachers];
				break;
			case 'students':
				include = [Models.lessons];
				break;
			case 'teachers':
				include = [Models.lessons];
				break;
			default: include = [];
		}
		ctx.body = await Models[tableName].findAll({ include });
	},

	async search(ctx) {
		const qbuilder = new QueryBuilder(ctx.query);
		const data = await Models.lessons.findAll(qbuilder.getQuery());
		QueryBuilder.visitCounter(data);
		QueryBuilder.reworkAnswer(data);
		ctx.body = (qbuilder.studentsCount === false) ? data : QueryBuilder.countFilter(data, qbuilder.studentsCount);
	},

	async create(ctx) {
		const creator = new Creator(ctx.request.body);
		ctx.body = await creator.performCreationArray();
	},
};
