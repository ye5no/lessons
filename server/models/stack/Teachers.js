import Sequelize from 'sequelize';
import sequelize from '../../utils/sequelize-connector';

export default class Teachers extends Sequelize.Model {
	static associate(models) {
		this.belongsToMany(models.Lessons, {through: models.LessonTeachers});
	}
}
Teachers.init(
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
		tableName: 'teachers',
		underscored: true,
		sequelize,
	}
);
