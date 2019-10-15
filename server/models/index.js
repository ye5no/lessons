import sql from '../utils/sequelize-connector';
import fs from 'fs';

const Models = {};
const stack = fs.readdirSync(__dirname + '/stack').sort();
stack.forEach((file) => {
	Models[file.replace('.js', '')] = require('./stack/' + file)(sql);
});

export default Models;
