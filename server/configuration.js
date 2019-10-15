import config from 'config';
import path from 'path';

const DIRS = {};
DIRS.main = path.resolve();
DIRS.server = path.resolve('server');
DIRS.public = path.resolve('public');
const ENV = config.get('env');
const ADDRESS = config.get('address');
const SQL = config.get('sql');
const CORS = config.get('cors');

export {
	DIRS,
	ENV,
  ADDRESS,
	SQL,
	CORS,
};
