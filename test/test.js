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
			res.should.have.status(200);
			res.body.should.be.a('object');
			console.log(res.body);
			done();
		});
	});
});

describe('GET specific meetup', () => {
	it('it should GET a specific meetup', (done) => {
		chai.request(server)
		.get('/api/v1/meetup/1')

		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('object');
			console.log(res.body);
			done();
		});
	});
});

describe('POST meetup', () => {
	it('it should POST a meetup', (done) => {
		chai.request(server)
		.post('/api/v1/meetup')
		.send({
			location: "Kigali Heights",
			image: "meetup_test.png",
			topic: "javascript for beginner",
			happeningOn: "02/12/2019",
			tags: "JS"
		})
		
		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('object');
			console.log(res.body);
			done();
		});
	});
});