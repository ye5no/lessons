const assert = require('assert');
const request = require('request');
const rp = require('request-promise');
const config = require('config');
const ADDRESS = config.get('address');
const SQL = config.get('sql');

rp.defaults({
  simple: false,
  resolveWithFullResponse: true,
  encoding: 'utf-8',
});

const mainURL = ADDRESS.test;
console.log(`URL: ${mainURL}`);
console.log(`Env: ${process.env.NODE_ENV}`);
console.log(`Database: ${SQL.database}`);

describe('--------Common tests-----------', ()=> {
  it('Correct /api/docs', (done)=> {
    request(mainURL + '/api/docs', (err, resp, body) => {
      if (err) return done(err);
      assert.strictEqual(resp.statusCode, 200);
      done();
    });
  });

  it('Incorrect /api/hello', (done)=> {
    request(mainURL+'/api/hello', (err, resp, body) => {
      if (err) return done(err);
	    assert.strictEqual(resp.statusCode, 404);
      // assert.strictEqual(body.indexOf('Wrong API request')!==-1, true);
      done();
    });
  });
});
