const express = require('express');
const app = express();
app.use(express.json());
const meetups = require('./models/meetup');
const questions = require('./models/question');
const users = require('./models/user');
const routeMeetups = require('./controllers/meetup');
const routeusers = require('./controllers/user');
const upcoming = require('./controllers/upcoming');
const routeQuestion = require('./controllers/question');

app.use('/api/v1/meetups', routeMeetups);
app.use('/api/v1/users', routeusers);
app.use('/api/v1/upcomingMeetup', upcoming);
app.use('/api/v1/questions', routeQuestion);

app.get('/', (req, res) => {
	res.send('Welcome to my questioner app');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to port ${port}...`));
module.exports = app;