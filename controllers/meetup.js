const express = require('express');
const Joi = require('joi');
const router = express.Router();
const meetups = require('../models/meetup');
const questions = require('../models/question');
const rsvp = require('../models/rsvp')


//Get all meetups
router.get('/', (req, res) => {
	if (meetups.length === 0) res.status(404).send('no meetup found');
	return res.send({
		status: 200,
		data: meetups
	});
});


//Get Upcoming meetups
router.get('/upcoming', (req, res) => {
		const upcoming = [];
		let current = new Date();
		current = current.getTime();
	for (let i = 0; i < meetups.length; i++) {
		let happen = meetups[i].happeningOn;
		happen = happen.split("/");
		happen = happen[1] +"/" + happen[0] +"/" +happen[2];
		happen = new Date(happen).getTime();

		if (current <= happen){
			upcoming.push(meetups[i]);
		}
	}

	if (upcoming.length > 0) {
		return res.send({
		status: 200,
		data: upcoming
	});
	}
		return res.status(404).send({
		status: 404,
		error: "No upcoming event"
	});
});

// Get a specific meetup
router.get('/:id', (req, res) => {
	const meetup = meetups.find(m => m.id === parseInt(req.params.id));
	if (!meetup){
		res.status(404).send(`The meetup with ID ${req.params.id} was not found`);
} else {
		res.send({
		status: 200,
		data: meetup
	});
	}
});

// Create a meetup
router.post('/', (req, res) => {

	const schema = {
		location: Joi.string().min(3).required(),
		images: Joi.string().min(3).required(),
		topic: Joi.string().min(3).required(),
		happeningOn: Joi.string().min(3).required(),
		tags: Joi.string().min(3).required()
	}
	const { error } = Joi.validate(req.body, schema);

	if(error){
		return res.send({
			status: 400,
			error: error.details[0].message
		})
	} else{
		const meetup = {
			id: meetups.length + 1,
			createdOn: Date(),
			location: req.body.location,
			images: req.body.images,
			topic: req.body.topic,
			happeningOn: req.body.happeningOn,
			tags: req.body.tags
		};
		meetups.push(meetup);
		return res.status(201).send({
			status: 201,
			data: meetup
		});	
	};

	
});

//Update a meetup with a given meetup id
router.put('/:id', (req, res) => {
	const meetup = meetups.find(m => m.id === parseInt(req.params.id));
	if (!meetup) res.status(404).send(`The meetup with ID ${req.params.id} was not found`);
	meetup.location = req.body.location;
	meetup.image = req.body.image;
	meetup.topic = req.body.topic;
	meetup.happeningOn = req.body.happeningOn;
	meetup.tags = req.body.tags;
	return res.send({
			status: 200,
			data: meetup
	});
});

//Delete a meetup with a given meetup id
router.delete('/:id', (req, res) => {
	const meetup = meetups.find(m => m.id === parseInt(req.params.id));
	if (!meetup) {
		return res.send({
			status: 404,
			error: `The meetup with ID ${req.params.id} was not found`
			});
	} else {
		const index = meetups.indexOf(meetup);
		meetups.splice(index, 1);
		return res.send({
					status: 200,
					data: meetup
		});
	}
	
});



// Respond an rsvp for a meetup
router.post('/:meetupId/rsvp', (req, res) => {

	let schema = {
		user: Joi.number().required(),
		status: Joi.string().min(2).required(),
	};

	let { error } = Joi.validate(req.body, schema);
	if(error){
	return res.status(400).send({
		status: 400,
		error: error.details[0].message
	});
	} else {
		const meetup = meetups.find(m => m.id === parseInt(req.params.meetupId));
		if (!meetup) {
			return res.status(404).send({
			status: 404,
			error: `Meetup with ID ${singleRsvp.meetup} not found`
		});
		} 

		const singleRsvp = {
			id: rsvp.length + 1,
			user: req.body.user,
			topic: meetup.topic,
			status: req.body.status
		}
			rsvp.push(singleRsvp);
			return res.status(201).send({
			status: 201,
			data: singleRsvp
		});
	}
	
});

// Ask question on a specific meetup with given meetup Id
router.post('/:meetupId/question', (req, res) => {
	let schema = {
		title: Joi.string().min(3).required(),
		body: Joi.string().min(3).required(),
		createdBy: Joi.number()
	}
	let { error } = Joi.validate(req.body, schema);
	if(error){
		res.send({
			status: 400,
			error: error.details[0].message
		})
	} else {
		const meetup = meetups.find(m => m.id === parseInt(req.params.meetupId));
		if (!meetup) {
			return res.send({
				status: 404,
				error: `Meetup with ID ${req.params.meetupId} not found`
			});
		} 		

		const question = {
			id: questions.length + 1,
			createdOn: Date(),
			createdBy: req.body.createdBy,
			meetup: req.params.meetupId,
			title: req.body.title,
			body: req.body.body,
			votes: 0,
			downvotes: 0,
			upvotes: 0
		}
		questions.push(question);
		return res.status(201).send({
			status: 201,
			data: question
		});

	}

	
});

module.exports = router;