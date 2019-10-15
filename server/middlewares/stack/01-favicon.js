import favicon from 'koa-favicon';
import { DIRS } from 'configuration';
import path from 'path';

export default (app) => {
  const favFile = path.resolve(DIRS.public, 'api', 'favicon.png');
  app.use(favicon(favFile));
};
