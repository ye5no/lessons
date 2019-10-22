import Sequelize from 'sequelize';
import sequelize from '../../utils/sequelize-connector';

export default class Lessons extends Sequelize.Model {
	static associate(models) {
		this.belongsToMany(models.Teachers, {through: models.LessonTeachers});
		this.belongsToMany(models.Students, {through: models.LessonStudents});
	}
}
Lessons.init({
		id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		date: {
			type: Sequelize.DATEONLY,
			allowNull: false,
		},
		title: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		status: {
			type: Sequelize.INTEGER,
			allowNull: true,
			defaultValue: '0',
		},
	}, {
		sequelize,
		tableName: 'lessons',
		underscored: true,
});
