import Router from 'koa-router';
import controller from './controller';

const router = new Router({ prefix: '/lessons' });

router
	.get('/list/:tableName', controller.list)
	.get('/', controller.search)
	.post('/', controller.create)
;

export default router.routes();
