import express from 'express';
import Joi from 'joi';
import meetups from '../models/meetup';
import questions from '../models/question';
import rsvp from '../models/rsvp';
const router = express.Router();
import pool from '../connect.js';

//Get all meetups
router.get('/', (req, res) => {
	pool.query('SELECT * FROM meetups', (err, resp) => {
		if (err){
			return res.status(400).send({
				status: 400,
				error: err
			})
		}
		if (resp.rows.length === 0){
			return res.status(404).send('no meetup found');
		} else {
			return res.send({
			status: 200,
			data: resp.rows
		});
		}
		
	});
	
});


//Get Upcoming meetups
router.get('/upcoming', (req, res) => {
		const upcoming = [];
		let current = new Date();
		current = current.getTime();
		pool.query('SELECT * FROM meetups', (err, resp) => {
			const meetups = resp.rows;
			if(err){
			return res.status(400).send({
				status: 400,
				error: err
			});
			}

			for (let i = 0; i < meetups.length; i++) {
			let happen = meetups[i].happeningon;
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


	
});

// Get a specific meetup
router.get('/:id', (req, res) => {
	const id = parseInt(req.params.id);
	pool.query('SELECT * FROM meetups WHERE id = $1', [id], (err, resp) => {
		const meetup = resp.rows;
		if (meetup.length === 0){
		return res.status(404).send({
			status: 404,
			error: `Meetup with Id ${id} doesn't exist`
		})
		} else {
			res.send({
			status: 200,
			data: meetup
		});
		}
	});
	
});

// Create a meetup
router.post('/', (req, res) => {

	const schema = {
		location: Joi.string().min(3).required().trim(),
		images: Joi.string().min(3).required(),
		topic: Joi.string().min(3).required().trim(),
		happeningon: Joi.string().min(3).trim().required(),
		tags: Joi.string().min(3).required().trim()
	}
	const { error } = Joi.validate(req.body, schema);

	if(error){

		return res.status(400).send({
			status: 400,
			error: error.details[0].message
		})
	} else{
		const meetup = [
			req.body.location,
			req.body.images,
			req.body.topic,
			req.body.happeningon,
			req.body.tags
		];
		pool.query('INSERT INTO meetups(location, images, topic, happeningon, tags) VALUES($1, $2, $3, $4, $5) RETURNING *', meetup)
		.then((response)=>{
			return res.status(201).send({
			status: 201,
			data: response.rows
		});
		})
		.catch((err)=>{
			return res.status(400).send({
             status: 400,
             error: err.message
			})
		})
	};

	
});


//Update a meetup with a given meetup id
router.put('/:id', (req, res) => {
	const id = req.params.id;
	pool.query('SELECT * FROM meetups WHERE id = $1', [id], (err, resp) => {
		const schema = {
			location: Joi.string().min(3).required().trim(),
			images: Joi.string().min(3).required().trim(),
			topic: Joi.string().min(3).required().trim(),
			happeningon: Joi.string().min(3).required().trim(),
			tags: Joi.string().min(3).required()
		}

		const { error } = Joi.validate(req.body, schema);
		if (error){
			return res.status(400).send({
			status: 400,
			error: error.details[0].message
		})
		}

		if (resp.rows.length === 0){
			return res.status(404).send({
				status: 404,
				error: `Meetup with Id ${id} dosen't exist`
			});
		} else {
			const meetup = [
			req.body.location,
			req.body.images,
			req.body.topic,
			req.body.happeningon,
			req.body.tags,
			req.params.id
		]
			pool.query('UPDATE meetups SET location = $1, images = $2, topic = $3, happeningon = $4, tags = $5 WHERE id = $6 RETURNING *', meetup, (error, result) =>{
				return res.send({
						status: 200,
						data: result.rows
				});	
			});			
		}
	});	
	
});

//Delete a meetup with a given meetup id
router.delete('/:id', (req, res) => {
	const id = parseInt(req.params.id);
	pool.query('SELECT * FROM meetups WHERE id = $1', [id], 
		(err, resp) =>{
			if(err){
				res.status(400).send({
					status: 400,
					error: err
				});
			} else {
				if (resp.rows.length === 1){
					pool.query('DELETE FROM meetups WHERE id = $1 RETURNING *', [id], (er, respo) => {
						return res.status(200).send({
							status: 200,
							data: respo.rows
						});
					});
						
				} else {
					return res.status(404).send({
					status: 404,
					data: `meetup with Id ${id} Not found`
				});
				}
			}
		});
	});

// Respond an rsvp for a meetup
router.post('/:meetupId/rsvp', (req, res) => {

	let schema = {
		createdby: Joi.number().required(),
		response: Joi.string().min(2).required(),
	};

	let { error } = Joi.validate(req.body, schema);
	if(error){
	return res.status(400).send({
		status: 400,
		error: error.details[0].message
	});
	} else {
		const id = req.params.meetupId;
		pool.query('SELECT * FROM meetups WHERE id = $1', [id], (err, resp) => {
			if (resp.rows.length === 0){
				return res.status(404).send({
				status: 404,
				error: `Meetup with Id ${id} dosen't exist`
			});
			} else  {
				const topic = resp.rows[0].topic;
				const meetup = resp.rows[0].id;
				const user = req.body.createdby;
				const response = req.body.response;
				const newRsvp = [
					meetup,
					user,
					topic,
					response
				];
				//console.log(newRsvp);
				pool.query('INSERT INTO rsvp(meetup, createdby, topic, response) VALUES ($1, $2, $3, $4)', newRsvp, 
				(erro, result) =>{
					if(erro){
						return res.status(400).send({
							status: 400,
							error: erro
						})
					} 
						return res.status(201).send({
							status: 201,
						data: result.rows
					});
				});
			}
		});
	}
	
});

// Ask question on a specific meetup with given meetup Id
router.post('/:meetupId/question', (req, res) => {
	let schema = {
		title: Joi.string().min(3).required().trim(),
		body: Joi.string().min(3).required().trim(),
		createdby: Joi.number().required()
	}
	let { error } = Joi.validate(req.body, schema);
	if(error){
		res.send({
			status: 400,
			error: error.details[0].message
		})
	} else {

		const id = req.params.meetupId;
		pool.query('SELECT * FROM meetups WHERE id = $1', [id], (err, resp) => {
			if (resp.rows.length === 0){
				return res.status(404).send({
				status: 404,
				error: `Meetup with Id ${id} dosen't exist`
			})
			} else  {
				const createdby = req.body.createdby;
				const meetup = resp.rows[0].id;
				const title = req.body.title;
				const body = req.body.body;

				const newQuestion = [
					createdby,
					meetup,
					title,
					body
				];

				
				
				pool.query('INSERT INTO questions (createdby, meetup, title, body) VALUES ($1, $2, $3, $4) returning *', newQuestion, 
				(erro, result) =>{
						if(result){
							const qid = result.rows[0].id;
							const vote =[qid, createdby, false, false];
							pool.query('INSERT INTO votes (question, votedby, upvotes, downvotes) VALUES ($1, $2, $3, $4)', vote);
						}
						
					if(erro){
						return res.status(400).send({
							status: 400,
							error: erro
						})
					} else {
						return res.status(200).send({
							status: 200,
							data: result.rows
						});
						
					}
										
				});
			}
		});	
	}	
});
export default router;