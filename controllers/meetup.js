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
		res.status(404).send(`The meetup with ID ${req.params.id} was not found`);
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
		location: Joi.string().min(3).required(),
		images: Joi.string().min(3).required(),
		topic: Joi.string().min(3).required(),
		happeningon: Joi.string().min(3).required(),
		tags: Joi.string().min(3).required()
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
			location: Joi.string().min(3).required(),
			images: Joi.string().min(3).required(),
			topic: Joi.string().min(3).required(),
			happeningon: Joi.string().min(3).required(),
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
		res.status(404).send(`The meetup with ID ${req.params.id} was not found`);
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
	pool.query('UPDATE meetups')
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
		const id = req.params.meetupId;
		pool.query('SELECT * FROM meetups WHERE id = $1', [id], (err, resp) => {
			if (resp.rows.length === 0){
			res.status(404).send(`The meetup with ID ${req.params.id} was not found`);
			} else  {
				const rsvp = [
					req.body.user,
					resp.rows.topic,
					req.body.status
				]
				pool.query('INSERT INTO rsvps (user, meetup, status) VALUES ($1, $2, $3)', rsvp, (erro, result) =>{
					if(erro){
						return res.status(400).send({
							status: 400,
							error: erro
						})
					} 
						return res.status(200).send({
							status: 200,
						data: resp.rows
					});
				});
			}
		});
	}
	
});
export default router;