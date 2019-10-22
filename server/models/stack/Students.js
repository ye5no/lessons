import Sequelize from 'sequelize';
import sequelize from '../../utils/sequelize-connector';

export default class Students extends Sequelize.Model {
	static associate(models) {
		this.belongsToMany(models.Lessons, {through: models.LessonStudents});
	}
}
Students.init(
	{
		id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: true,
		},
	}, {
		tableName: 'students',
		underscored: true,
		sequelize,
	}
);
