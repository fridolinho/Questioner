const express = require('express');
const app = express();
app.use(express.json());
const meetups = require('./controllers/meetup');
const questions = require('./controllers/question');
const users = require('./controllers/user');
const routeMeetups = require('./models/meetup');
const routeusers = require('./models/user');
const upcoming = require('./models/upcoming');
const routeRsvp = require('./models/rsvp');
const routeQuestion = require('./models/question');

app.use('/api/v1/meetup', routeMeetups);
app.use('/api/v1/user', routeusers);
app.use('/api/v1/upcomingMeetup', upcoming);
app.use('/api/v1/question', routeQuestion);

app.get('/', (req, res) => {
	res.send('Welcome to my questioner app');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to port ${port}...`));
module.exports = app;