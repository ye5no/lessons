import Sequelize from 'sequelize';
import { SQL } from 'configuration';

export default new Sequelize(SQL.database, SQL.username, SQL.password, SQL.options);
