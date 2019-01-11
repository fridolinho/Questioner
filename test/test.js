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

describe('Update meetup', () => {
	it('it should update an existing meetup', (done) => {
		chai.request(server)
		.put('/api/v1/meetup/2')
		.send({
			location: "Kigali Convention Center",
			image: "meetup_test3.png",
			topic: "NodeJS for beginner",
			happeningOn: "07/12/2019",
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

describe('Delete a meetup', () => {
	it('it should delete an existing meetup', (done) => {
		chai.request(server)
		.delete('/api/v1/meetup/2')	
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
		.get('/api/v1/upcomingMeetup')

		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('object');
			console.log(res.body);
			done();
		});
	});
});

describe('POST rsvp for a meetup', () => {
	it('it should POST an rsvp for a specific meetup', (done) => {
		chai.request(server)
		.post('/api/v1/meetup/3/rsvp')
		.send({
			user: 1,
			response: "attending"
		})		
		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('object');
			console.log(res.body);
			done();
		});
	});
});

describe('POST a qustion for a meetup', () => {
	it('it should POST a question for a specific meetup', (done) => {
		chai.request(server)
		.post('/api/v1/3/question')
		.send({
			createdBy: 1,
			body: "attending",
			title: "test"
		})		
		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('object');
			console.log(res.body);
			done();
		});
	});
});

describe('Downvote a question', () => {
	it('it should Update the votes of a question remove 1', (done) => {
		chai.request(server)
		.patch('/api/v1/question/3/downvote')
		
		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('object');
			console.log(res.body);
			done();
		});
	});
});

describe('Upvote a question', () => {
	it('it should Update the votes of a question plus 1', (done) => {
		chai.request(server)
		.patch('/api/v1/question/4/upvote')
		
		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('object');
			console.log(res.body);
			done();
		});
	});
});

describe('Register a user', () => {
	it('it should POST registered user datas ', (done) => {
		chai.request(server)
		.post('/api/v1/user')
		.send({
			firstname: "Habimana",
			lastname: "J. paul",
			othername: "kadogo",
			phoneNumber: "0788245521",
			email: "jphab@gmail.com",
			username: "habJP"
		})		
		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('object');
			console.log(res.body);
			done();
		});
	});
});

describe('login a user', () => {
	it('it should GET user datas by email', (done) => {
		chai.request(server)
		.get('/api/v1/user')
		.send({email: "jphab@gmail.com"})		
		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('object');
			console.log(res.body);
			done();
		});
	});
});