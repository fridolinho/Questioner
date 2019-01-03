const express = require('express');
const app = express();
app.use(express.json());
const meetups = [
	{
		id : 1,
		createdOn: '12/12/2018',
		location: 'Kigali heights',
		images: 'img/meetup.png',
		topic: 'meetup object 1',
		happeningOn: '13/01/2019',
		Tags: 'javascript, nodejs',

	},
	{
		id : 2,
		createdOn: '14/12/2018',
		location: 'westerwelle',
		images: 'img/meetup1.png',
		topic: 'meetup object 2',
		happeningOn: '15/01/2019',
		Tags: 'javascript, nodejs'

	},
	{
		id : 3,
		createdOn: '19/12/2018',
		location: 'Kigali convetion center',
		images: 'img/meetup2.png',
		topic: 'meetup object 3',
		happeningOn: '23/01/2019',
		Tags: 'javascript, nodejs'

	},
	{
		id : 4,
		createdOn: '22/12/2018',
		location: 'Hilltop hotel',
		images: 'img/meetup3.png',
		topic: 'meetup object 4',
		happeningOn: '30/02/2019',
		Tags: 'javascript, nodejs'

	}
]





const questions = [
	{
		id : 1 ,
		createdOn : "19/12/2018" ,
		createdBy : 1 , // represents the user asking the question
		meetup : 1 , // represents the meetup the question is for
		title : "question 1" ,
		body : "Quisque lacus ante, lacinia et diam vel, mattis maximus enim. Morbi et mattis metus, vitae sagittis arcu. Nunc vel tincidunt risus, ac rhoncus nisi. Nam sagittis iaculis nisl non mattis. Cras a gravida velit. Suspendisse tortor mauris, eleifend et leo a, volutpat varius augue. Nullam sed lorem mollis, ornare mi vel, imperdiet sapien. Duis orci sem, eleifend nec orci egestas, luctus sagittis arcu. Fusce accumsan blandit viverra. Vivamus feugiat dolor eu malesuada vestibulum. Sed suscipit commodo nunc. " ,
		votes : 0 ,
	},
	{
		id : 2 ,
		createdOn : "21/12/2018" ,
		createdBy : 1 , // represents the user asking the question
		meetup : 1 , // represents the meetup the question is for
		title : "question 2" ,
		body : "Morbi at pellentesque elit. Donec vitae mi elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean suscipit, augue sit amet ultrices commodo, felis velit dictum enim, sit amet placerat enim justo sed est. Pellentesque quis euismod lorem. Donec ultrices vel ligula ac pellentesque. Nam pharetra vitae quam mollis ullamcorper. Sed hendrerit turpis enim, nec ornare sapien pulvinar ac. Aenean ultricies eu lorem at tincidunt. Nullam odio risus, luctus sed finibus non, commodo eu ante. Nam molestie sem ex, sit amet facilisis felis aliquam eu. " ,
		votes : 0 ,
	},
	{
		id : 3 ,
		createdOn : "11/12/2018" ,
		createdBy : 1 , // represents the user asking the question
		meetup : 1 , // represents the meetup the question is for
		title : "question 3" ,
		body : "Suspendisse potenti. Phasellus vel ullamcorper massa, eget tincidunt tellus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis non egestas tortor. Sed fermentum sodales est, ut fringilla diam aliquam vitae. Praesent aliquet interdum pellentesque. Pellentesque vel sagittis nunc. In tortor purus, pharetra facilisis faucibus sit amet, lobortis quis eros. Proin eget ligula dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur quam libero, maximus at orci at, viverra condimentum quam. Donec sed mauris congue, egestas ligula sit amet, tincidunt enim. Ut tincidunt, ex eu iaculis pharetra, nisl est sagittis ante, eu dignissim erat odio sit amet tellus. In euismod a urna eu rhoncus. Donec tincidunt sagittis ipsum in cursus. Mauris tincidunt nulla non auctor lobortis. " ,
		votes : 0 ,
	},
	{
		id : 4 ,
		createdOn : "09/12/2018" ,
		createdBy : 1 , // represents the user asking the question
		meetup : 2 , // represents the meetup the question is for
		title : "question 4" ,
		body : "Donec id massa eget justo mollis euismod. Curabitur rutrum neque orci, id sollicitudin turpis venenatis a. Suspendisse aliquet feugiat placerat. Nullam sed ex ut leo sodales rutrum. Ut fringilla metus efficitur enim volutpat, ut dapibus est mattis. Quisque non laoreet felis. Ut pharetra vehicula auctor. Vestibulum ullamcorper ex turpis. Morbi ante magna, pretium sed tristique in, lacinia nec sapien. Nunc quam nunc, molestie vel tempor eu, commodo ut mauris. " ,
		votes : 0 ,
	},
	{
		id : 5 ,
		createdOn : "25/10/2018" ,
		createdBy : 1 , // represents the user asking the question
		meetup : 1 , // represents the meetup the question is for
		title : "question 2" ,
		body : "Nullam at molestie lacus. Aliquam ut vehicula ex. Nulla facilisi. Mauris viverra ac lacus tempus scelerisque. Curabitur pellentesque varius ipsum, ac pellentesque nunc feugiat non. Quisque non elementum augue. Ut a sagittis metus, et rhoncus dolor. " ,
		votes : 0 ,
	},
	{
		id : 6 ,
		createdOn : "01/12/2018" ,
		createdBy : 1 , // represents the user asking the question
		meetup : 3 , // represents the meetup the question is for
		title : "question 2" ,
		body : "Nam consequat id dolor at sodales. Sed pharetra sollicitudin sagittis. Duis imperdiet gravida dui ut ullamcorper. Fusce leo tellus, ultricies varius elementum id, dictum quis dui. Morbi eu sagittis nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec at vestibulum eros. Praesent id sapien id nunc molestie venenatis. Phasellus eget justo semper, mattis nisi id, viverra nisi. Etiam vel porta massa, ac venenatis tortor. Aenean euismod suscipit sagittis. In id interdum dolor. " ,
		votes : 0 ,
	}
]

const rsvp = [];


app.get('/api/v1/meetup', (req,res) =>{
	res.send(meetups);
});


app.get('/api/v1/meetup/:id', (req,res) =>{
	const meetup = meetups.find(m=>m.id === parseInt(req.params.id));
	if(!meetup) res.status(404).send(`The meetup with ID ${req.params.id} was not found`);
	res.send(meetup);
})

app.post('/api/v1/meetup', (req,res)=>{
	const meetup = {
		id: meetups.length +1,
		createdOn: Date(),
		location: req.body.location,
		images: req.body.image,
		topic: req.body.topic,
		happeningOn: req.body.happeningOn,
		Tags:req.body.Tags
	}

	meetups.push(meetup);
	res.send(meetup);
})

app.put('/api/v1/meetup/:id', (req,res)=>{
	const meetup = meetups.find(m=>m.id === parseInt(req.params.id));
	if(!meetup) res.status(404).send(`The meetup with ID ${req.params.id} was not found`);
	meetup.location = req.body.location,
	meetup.image = req.body.image,
	meetup.topic = req.body.topic,
	meetup.happeningOn = req.body.happeningOn,
	meetup.Tags = req.body.Tags
	res.send(meetup);
})

app.delete('/api/v1/meetup/:id', (req,res)=>{
	const meetup = meetups.find(m=>m.id === parseInt(req.params.id));
	if(!meetup) res.status(404).send(`The meetup with ID ${req.params.id} was not found`);
	const index = meetups.indexOf(meetup);
	meetups.splice(index, 1);

	res.send(meetup);
})

app.get('/api/v1/question', (req,res) =>{
	res.send(questions);
})

app.post('/api/v1/question', (req,res)=>{
	const question = {
		id: questions.length +1,
		createdOn: req.body.createdOn,
		createdBy: req.body.createdBy,
		meetup: req.body.meetup,
		title: req.body.title,
		body: req.body.body
	}

	questions.push(question);
	res.send(question);
})

app.post('/api/v1/rsvp', (req,res)=>{
	const single_rsvp = {
		id: rsvp.length + 1,
		user: req.body.user,
		meetup: req.body.meetup,
		response: req.body.response
	}

	rsvp.push(single_rsvp);
	res.send(single_rsvp);
})

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening to port ${port}...`));