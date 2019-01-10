const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../index');

describe('open the homepage', () => {
	it('it should open the homepage', (done) => {
		chai.request(server)
		.get('/')
		.end((err, res) => {
		res.should.have.status(200);
		done();
		});
	});
});

describe('GET all meetups', () => {
	it('it should GET all the meetups', (done) => {
		chai.request(server)
		.get('/api/v1/meetup')

		.end((err, res) => {
            console.log(res.body);
			res.should.have.status(200);
			res.body.should.be.a('object');
			done();
		});
	});
})