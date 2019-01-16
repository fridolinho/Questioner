const express = require('express');
const router = express.Router();
const questions = require('../controllers/question')
const meetups = require('../controllers/meetup')

// Ask question on a specific meetup with given meetup Id
router.post('/:meetupId', (req, res) => {
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
	const meetup = meetups.find(m => m.id === parseInt(req.params.meetupId));
	if (!meetup) {
		return res.send({
		status: 404,
		error: `Meetup with ID ${req.params.meetupId} not found`
	});
	} 
		questions.push(question);
		return res.send({
		status: 201,
		data: question
	});
});

// Downvote a question
router.patch('/:id/downvote', (req, res) => {
	const question = questions.find(m => m.id === parseInt(req.params.id));
	if (!question) {
		return res.send({
		status: 404,
		error: `Question with ID ${req.params.id} not found`
	});
	}
	question.votes = question.votes + 1;
	question.downvote = question.downvote - 1
	return res.send({
		status: 201,
		data: question
	});
});

// Upvote a question
router.patch('/:id/upvote', (req, res) => {
	const question = questions.find(m => m.id === parseInt(req.params.id));
	if (!question) {
		return res.send({
		status: 404,
		error: `Question with ID ${req.params.id} not found`
	});
	}
	question.votes = question.votes + 1;
	question.upvote = question.upvote + 1
	return res.send({
		status: 201,
		data: question
	});
});

module.exports = router;