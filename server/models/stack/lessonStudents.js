import Sequelize from 'sequelize';

module.exports = function(sequelize) {
  return sequelize.define('lesson_students', {
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
    student_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'students',
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
  });
};
