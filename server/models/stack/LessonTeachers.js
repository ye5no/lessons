import Sequelize from 'sequelize';
import sequelize from '../../utils/sequelize-connector';

export default class LessonTeachers extends Sequelize.Model {
	static associate(models) {
		this.belongsTo(models.Teachers);
		this.belongsTo(models.Lessons);
	}
}
LessonTeachers.init(
	{
		lesson_id: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'Lessons',
				key: 'id',
			},
		},
		teacher_id: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'Teachers',
				key: 'id',
			},
		},
	}, {
		tableName: 'lesson_teachers',
		underscored: true,
		sequelize,
	}
);
