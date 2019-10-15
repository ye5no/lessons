import Sequelize from 'sequelize';

module.exports = function(sequelize) {
  return sequelize.define('teachers', {
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
  });
};
