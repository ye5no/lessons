import { SQL } from 'configuration';
import sequelize from '../../utils/sequelize-connector';

export default async () => {
  process.stdout.write('PostgreSQL...');
  const intProcess = setInterval(() => process.stdout.write('.'), 200);
  try {
  	await sequelize.authenticate();
  	await sequelize.sync({ alter: false });
	  clearInterval(intProcess);
	  process.stdout.write(`${SQL.database}\n`);
	} catch (e) {
		clearInterval(intProcess);
		process.stdout.write('error\n');
		throw e;
	}
};
