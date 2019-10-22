const assert = require('assert');
const rp = require('request-promise');
const config = require('config');
const ADDRESS = config.get('address');

rp.defaults({
	simple: false,
	resolveWithFullResponse: true,
	encoding: 'utf-8',
});

const mainURL = ADDRESS.test;
const prefix = `${mainURL}/api/lessons`;

describe('--------POST /api/lessons/-----------', () => {
	it('POST 4 lessons', async () => {
		const options = {
			method: 'POST',
			uri: `${prefix}`,
			headers: {
				'Content-Type' : 'application/json',
			},
			body: JSON.stringify({
				'teacherIds': [4],
				'title': 'Test mocha',
				'days': [1, 5],
				'firstDate': '2019-12-01',
				'lessonsCount': 4,
			}),
		};
		const response = JSON.parse(await rp(options));
		assert.equal(response.length, 4);
	});
});
