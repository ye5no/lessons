import Sequelize from 'sequelize';

module.exports = function(sequelize) {
  return sequelize.define('students', {
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
  });
};
