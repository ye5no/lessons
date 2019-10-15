import sql from './stack/01-sql';
import server from 'server';

export default async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await sql();
      resolve();
    } catch (e) {
      console.log(e);
      console.log('Server has been closed');
      server.close();
      reject();
    }
  });
};
