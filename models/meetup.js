const express = require('express');
const router = express.Router();
const meetups = require('../controllers/meetup')

//Get all meetups
router.get('/', (req, res) => {
	if (meetups.length === 0) res.status(404).send('no meetup found');
	return res.send({
		status: 200,
		data: meetups
	});
});

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
	const meetup = {
		id: meetups.length + 1,
		createdOn: Date(),
		location: req.body.location,
		image: req.body.image,
		topic: req.body.topic,
		happeningOn: req.body.happeningOn,
		tags: req.body.tags
	}
	meetups.push(meetup);
	return res.send({
		status: 201,
		data: meetup
	});	
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
router.delete('/api/v1/meetup/:id', (req, res) => {
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
		return res.send({
		status: 201,
		data: singleRsvp
	});
});


module.exports = router;