import express from 'express';
import Joi from 'joi';
const JoiPhone = Joi.extend(require('joi-phone-number'));
const router = express.Router();
import pool from '../connect.js';

//User registration
router.post('/', (req, res) => {
	const firstName = req.body.firstname;
	const lastName = req.body.lastname;
	const otherName = req.body.othername;
	const email = req.body.email;
	const phoneNumber = req.body.phonenumber;
	const username = req.body.username;
	const password = "password";
	const user =[firstName, lastName, otherName, email, phoneNumber, username, password];
	const schema ={
		firstname: Joi.string().min(3).required().trim(),
		lastname: Joi.string().min(3).required().trim(),
		othername: Joi.string().trim(),
		email: Joi.string().email().required().trim(),
		phonenumber: JoiPhone.string().phoneNumber().required().trim(),
		username: Joi.string().min(3).required().trim(),
	}

	const { error } = Joi.validate(req.body, schema);
	if (error){
		return res.status(400).send({
				status: 400,
				error: error.details[0].message
				});
	} else {
		pool.query('INSERT INTO users (firstname, lastname, othername, email, phone, username, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', user)
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
	}
	
});

//User login
router.get('/', (req, res) => {
	const email = req.body.email;
	const logUser = [];
	pool.query('SELECT * FROM users WHERE email = $1', [email], (err, resp) => {
		if(resp){
			return res.status(200).send({
				status: 200,
				data: resp.rows
			});
		} else {
			return res.status(404).send({
				status: 404,
				error: `${email} not found`
			});
		}
	});		
});

export default router;