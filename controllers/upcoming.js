const express = require('express');
const router = express.Router();
const meetups = require('../models/meetup')

//Get Upcoming meetups
router.get('/', (req, res) => {
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

module.exports = router;