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

describe('--------GET /api/lessons/-----------', () => {
	it('GET default', async () => {
		const options = {
			method: 'GET',
			uri: `${prefix}`,
			headers: {
				'Content-Type' : 'application/json',
			},
		};
		const response = JSON.parse(await rp(options));
		assert.equal(Array.isArray(response), true);
		assert.equal(response.length, 5);
	});

	it('GET with pagination', async () => {
		const options = {
			method: 'GET',
			uri: `${prefix}?page=2&lessonsPerPage=4`,
			headers: {
				'Content-Type' : 'application/json',
			},
		};
		const response = JSON.parse(await rp(options));
		assert.equal(response[2].id, 7);
	});

	it('GET with status=1', async () => {
		const options = {
			method: 'GET',
			uri: `${prefix}?lessonsPerPage=100&status=1`,
			headers: {
				'Content-Type' : 'application/json',
			},
		};
		const response = JSON.parse(await rp(options));
		let check = response.every(el => el.status === 1);
		assert.equal(check, true);
	});
});
