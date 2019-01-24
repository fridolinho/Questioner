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

export default router;