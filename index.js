import express from 'express';
import meetups from './models/meetup';
import questions from './models/question';
import users from './models/user';
import routeMeetups from './controllers/meetup';
import routeusers from './controllers/user';
import routeQuestion from './controllers/question';
const app = express();
app.use(express.json());

app.use('/api/v1/meetups', routeMeetups);
app.use('/api/v1/users', routeusers);
app.use('/api/v1/questions', routeQuestion);

app.get('/', (req, res) => {
	res.send('Welcome to my questioner app');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to port ${port}...`));
export default app;