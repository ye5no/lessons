import Router from 'koa-router';
import fs from 'fs';

/*
* no routes dirs name starts with _
* no any files in this dir
* */

const router = new Router({ prefix: '/api' });
const stack = fs.readdirSync(__dirname).sort();
stack.forEach((file) => {
	if (file !== 'index.js' && file.indexOf('_') !== 0) {
		const required = require('./'+file).default;
		router.use(required);
	}
});

export default router.routes();
