import express from 'express';
import users from '../models/user';
const router = express.Router();

//User registration
router.post('/', (req, res) => {
	const user = {
		id: users.length + 1,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		othername: req.body.othername,
		email: req.body.email,
		phoneNumber: req.body.phoneNumber,
		username: req.body.username,
		registered: Date(),
		isAdmin: "no"
	}

	if (users.push(user)) {
		console.log(user.registered);
		return res.send({
			status: 201,
			data: user
		});
	}
		return res.send({
			status: 404,
			error: "User not registered"
		});	
});

//User login
router.get('/', (req, res) => {
	const email = req.body.email;
	const logUser = [];
	for (let i = 0; i < users.length; i++) {
		if (users[i].email === email) {
			logUser.push(users[i]);
		}
	}
		if (logUser.length !== 1) {
			return res.send({
				status: 404,
				error: "User not found"
			})
		}
		return res.send({
			status: 200,
			data: logUser
		});
});

export default router;