const express = require('express');
const app = express();
const meetups = [
	{
		id : 1,
		createdOn: '12/12/2018',
		location: 'Kigali heights',
		images: 'img/meetup.png',
		topic: '',
		happeningOn: '13/01/2019',
		Tags: 'javascript, nodejs',

	},
	{
		id : 2,
		createdOn: '14/12/2018',
		location: 'westerwelle',
		images: 'img/meetup1.png',
		topic: '',
		happeningOn: '15/01/2019',
		Tags: 'javascript, nodejs'

	},
	{
		id : 3,
		createdOn: '19/12/2018',
		location: 'Kigali convetion center',
		images: 'img/meetup2.png',
		topic: '',
		happeningOn: '23/01/2019',
		Tags: 'javascript, nodejs'

	},
	{
		id : 4,
		createdOn: '22/12/2018',
		location: 'Hilltop hotel',
		images: 'img/meetup3.png',
		topic: '',
		happeningOn: '30/01/2019',
		Tags: 'javascript, nodejs'

	}
]

app.get('/api/meetup', (req,res) =>{
	res.send(meetups);
})


const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening to port ${port}...`));