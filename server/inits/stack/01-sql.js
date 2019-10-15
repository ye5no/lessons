import { SQL } from 'configuration';
import sql from '../../utils/sequelize-connector';
import Models from '../../models';

export default async () => {
  process.stdout.write('PostgreSQL...');
  const intProcess = setInterval(() => process.stdout.write('.'), 200);
  try {
  	await sql.authenticate();
	  await Promise.all(Object.getOwnPropertyNames(Models).map(tableName => Models[tableName].sync({ alter: true })));

	  Models.lessonTeachers.belongsTo(Models.lessons);
	  Models.lessonStudents.belongsTo(Models.lessons);
	  Models.lessonTeachers.belongsTo(Models.teachers);
	  Models.lessonStudents.belongsTo(Models.students);

	  Models.lessons.belongsToMany(Models.teachers, { through: Models.lessonTeachers });
	  Models.lessons.belongsToMany(Models.students, { through: Models.lessonStudents });

	  Models.students.belongsToMany(Models.lessons, { through: Models.lessonStudents });
	  Models.teachers.belongsToMany(Models.lessons, { through: Models.lessonTeachers });


	  clearInterval(intProcess);
	  process.stdout.write(`${SQL.database}\n`);
	} catch (e) {
		clearInterval(intProcess);
		process.stdout.write('error\n');
		throw e;
	}
};
