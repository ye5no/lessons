import fs from 'fs';

const Models = {};
const stack = fs.readdirSync(__dirname + '/stack').sort();
stack.forEach((file) => {
	const model = file.replace('.js', '');
	Models[model] = require('./stack/' + file).default;
});

Object.getOwnPropertyNames(Models).forEach(model => {
	if (Models[model].associate) {
		Models[model].associate(Models);
	}
});

export default Models;

