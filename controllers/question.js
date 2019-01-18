import express from 'express';
import questions from '../models/question';
const router = express.Router();

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
	question.downvote = question.downvote + 1
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

export default router;