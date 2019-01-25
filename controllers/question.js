import express from 'express';
import questions from '../models/question';
const router = express.Router();
import pool from '../connect.js';

// Downvote a question
router.patch('/:id/downvote', (req, res) => {
	const id = req.params.id;
	const votedby = parseInt(req.body.votedby);
	const upvotes = false;
	const downvotes = true;
	const voted = [id, votedby];
	pool.query('SELECT * FROM votes WHERE question = $1 AND votedby = $2', voted, (errv, repv) => {		
		const length = repv.rows.length;
		if(length != 0){			
			const dowvotes = repv.rows[0].downvotes;
			const voteId =repv.rows[0].id;
			const vote = [upvotes, downvotes, voteId];
				if(dowvotes == true){
					return res.status(409).send({
					status: 409,
					error: 'You have already downvoted'
				});
				}

				pool.query('SELECT * FROM questions WHERE id = $1', [id],
				(err, resp) => {
					if (resp.rows.length === 1){

						pool.query('UPDATE questions SET downvotes = downvotes + 1 WHERE id = $1 RETURNING *', [id],
						(erro, response) => {
								return res.status(200).send({
									status: 200,
									data: response.rows
								});
						});
						pool.query('UPDATE  votes SET upvotes = $1, downvotes = $2 WHERE id = $3', vote);
					} else {
						return res.status(404).send({
							status: 404,
							error: `Question with Id ${id} dosen't exist`
						})
					}
			});

		} else {
			pool.query('SELECT * FROM questions WHERE id = $1', [id],
				(err, resp) => {
					if (resp.rows.length === 1){

						pool.query('UPDATE questions SET downvotes = downvotes + 1 WHERE id = $1 RETURNING *', [id],
						(erro, response) => {
								return res.status(200).send({
									status: 200,
									data: response.rows
								});
						});
						pool.query('UPDATE  votes SET upvotes = $1, downvotes = $2, WHERE id = $3', vote);
					} else {
						return res.status(404).send({
							status: 404,
							error: `Question with Id ${id} dosen't exist`
						})
					}
			});
		}
	});
});

// Upvote a question
router.patch('/:id/upvote', (req, res) => {
	const id = req.params.id;
	const votedby = parseInt(req.body.votedby);
	const upvotes = true;
	const downvotes = false;
	const voted = [id, votedby];
	pool.query('SELECT * FROM votes WHERE question = $1 AND votedby = $2', voted, (errv, repv) => {	
		const length = repv.rows.length;
		if(length != 0){
		const upvtes = repv.rows[0].upvotes;
		const voteId = repv.rows[0].id;
		const vote = [upvotes, downvotes, voteId];
		
		if(upvtes === true){
			return res.status(409).send({
				status: 409,
				error: 'You have already upvoted'
			});
		} else {
			pool.query('SELECT * FROM questions WHERE id = $1', [id],
				(err, resp) => {
				if (resp.rows.length === 1){
					pool.query('UPDATE questions SET upvotes = upvotes + 1 WHERE id = $1 RETURNING *', [id],
					(erro, response) => {
							return res.status(200).send({
								status: 200,
								data: response.rows
							});
					});
					pool.query('UPDATE  votes SET upvotes = $1, downvotes = $2 WHERE id = $3', vote);
				} else {
					return res.status(404).send({
						status: 404,
						error: `Question with Id ${id} doesn't exist`
					})
				}
			});
		}
		}
		 else {
			pool.query('SELECT * FROM questions WHERE id = $1', [id],
				(err, resp) => {
				if (resp.rows.length === 1){
					pool.query('UPDATE questions SET upvotes = upvotes + 1 WHERE id = $1 RETURNING *', [id],
					(erro, response) => {
							return res.status(200).send({
								status: 200,
								data: response.rows
							});
					});
					pool.query('UPDATE  votes SET upvotes = $1, downvotes = $2 WHERE id = $3', vote);
				} else {
					return res.status(404).send({
						status: 404,
						error: `Question with Id ${id} doesn't exist`
					})
				}
			});
		}
	});
	
});

export default router;