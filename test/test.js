import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
const should = chai.should();
chai.use(chaiHttp);

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

describe('POST meetup', () => {
	it('it should POST a meetup', (done) => {
		chai.request(server)
		.post('/api/v1/meetups')
		.send({
			location: "Kigali Heights",
			images: "meetup_test.png",
			topic: "javascript for beginner",
			happeningon: "02/12/2019",
			tags: "NodeJS"
		})
		
		.end((err, res) => {
			res.should.have.status(201);
			res.body.should.be.a('object');
			console.log(res.body);
			done();
		});
	});


	it('it should fail and return 400 error status code', (done) => {
		chai.request(server)
		.post('/api/v1/meetups')
		.send({
			location: "Kigali Heights",
			images: "meetup_test.png",
			topic: "",
			happeningOn: "02/12/2019",
			tags: "NodeJS"
		})
		
		.end((err, res) => {
			res.should.have.status(400);
			res.body.should.be.a('object');
			console.log(res.body);
			done();
		});
	});

	it('it should fail and return 400 error status code', (done) => {
		chai.request(server)
		.post('/api/v1/meetups')
		.send({
			location: "Kigali Heights",
			images: "meetup_test.png",
			happeningOn: "02/12/2019",
			tags: "NodeJS"
		})
		
		.end((err, res) => {
			res.should.have.status(400);
			res.body.should.be.a('object');
			console.log(res.body);
			done();
		});
	});


});

describe('GET all meetups', () => {
	it('it should GET all the meetups', (done) => {
		chai.request(server)
		.get('/api/v1/meetups')

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
		.get('/api/v1/meetups/7')

		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('object');
			console.log(res.body);
			done();
		});
	});
});



describe('Update meetup', () => {
	it('it should update an existing meetup', (done) => {
		chai.request(server)
		.put('/api/v1/meetups/7')
		.send({
			location: "Kigali Convention Center",
			images: "meetuptest.png",
			topic: "NodeJS for beginner",
			happeningon: "07/12/2019",
			tags: "Java"
		})
		
		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('object');
			console.log(res.body);
			done();
		});
	});
});



describe('GET all upcoming meetups', () => {
	it('it should GET upcoming meetups', (done) => {
		chai.request(server)
		.get('/api/v1/meetups/upcoming')

		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('object');
			console.log(res.body);
			done();
		});
	});
});

describe('POST rsvp for a meetup', () => {
	// it('it should POST an rsvp for a specific meetup and return 201 status code', (done) => {
	// 	chai.request(server)
	// 	.post('/api/v1/meetups/7/rsvp')
	// 	.send({
	// 		createdby: 1,
	// 		response: "yes"
	// 	})		
	// 	.end((err, res) => {
	// 		res.should.have.status(201);
	// 		res.body.should.be.a('object');
	// 		console.log(res.body);
	// 		done();
	// 	});
	// });


	it('it should no be able to POST an rsvp for a specific meetup, and return 400 status code', (done) => {
		chai.request(server)
		.post('/api/v1/meetups/7/rsvp')
		.send({
			user: 1,
			status: ""
		})		
		.end((err, res) => {
			res.should.have.status(400);
			res.body.should.be.a('object');
			console.log(res.body);
			done();
		});
	});

	it('it should fail, and return 400 error status', (done) => {
		chai.request(server)
		.post('/api/v1/meetups/7/rsvp')
		.send({
			user: 1
		})		
		.end((err, res) => {
			res.should.have.status(400);
			res.body.should.be.a('object');
			console.log(res.body);
			done();
		});
	});
});