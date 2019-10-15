import Sequelize from 'sequelize';

module.exports = function(sequelize) {
  return sequelize.define('lesson_teachers', {
	  id: {
		  type: Sequelize.INTEGER,
		  allowNull: false,
		  primaryKey: true,
		  autoIncrement: true,
	  },
    lesson_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'lessons',
        key: 'id',
      },
    },
    teacher_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'teachers',
        key: 'id',
      },
    },
  }, {
    tableName: 'lesson_teachers',
	  underscored: true,
  });
};
