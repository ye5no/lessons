import Sequelize from 'sequelize';

module.exports = function(sequelize) {
  return sequelize.define('lessons', {
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
    tableName: 'lessons',
	  underscored: true,
  });
};
