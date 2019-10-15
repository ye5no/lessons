import Router from 'koa-router';
import { ADDRESS } from 'configuration';

const router = new Router();

router
  .get('/', ctx => ctx.redirect('/api/docs/index'))
	.get('/api', ctx => ctx.body = ctx.redirect('/api/docs/index'))
  .get('/api/docs', ctx => ctx.redirect('/api/docs/index'))
  .get('/api/docs/index', async ctx => {
    ctx.state.urlExternal = ADDRESS.external+'/api/swagger.yaml';
    await ctx.render('api/docs/index');
  })
;

export default router.routes();
