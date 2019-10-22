import Sequelize from 'sequelize';
import sequelize from '../../utils/sequelize-connector';

export default class LessonStudents extends Sequelize.Model {
	static associate(models) {
		this.belongsTo(models.Students);
		this.belongsTo(models.Lessons);
	}
	static async countVisit() {
		const visited = await this.findAll({ where: { visit: true }});
		return visited.length;
	}
}
LessonStudents.init({
	lesson_id: {
		type: Sequelize.INTEGER,
		allowNull: true,
		references: {
			model: 'Lessons',
			key: 'id',
		},
	},
	student_id: {
		type: Sequelize.INTEGER,
		allowNull: true,
		references: {
			model: 'Students',
			key: 'id',
		},
	},
	visit: {
		type: Sequelize.BOOLEAN,
		allowNull: true,
		defaultValue: false,
	},

}, {
	tableName: 'lesson_students',
	underscored: true,
	sequelize,
});
