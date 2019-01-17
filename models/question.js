const questions = [
	{
		id: 1,
		createdOn: "19/12/2018",
		createdBy: 1, // represents the user asking the question
		meetup: 1, // represents the meetup the question is for
		title: "question 1",
		body: "Quisque lacus ante, lacinia et diam vel, mattis maximus enim. Morbi et mattis metus, vitae sagittis arcu. Nunc vel tincidunt risus, ac rhoncus nisi. Nam sagittis iaculis nisl non mattis. Cras a gravida velit. Suspendisse tortor mauris, eleifend et leo a, volutpat varius augue. Nullam sed lorem mollis, ornare mi vel, imperdiet sapien. Duis orci sem, eleifend nec orci egestas, luctus sagittis arcu. Fusce accumsan blandit viverra. Vivamus feugiat dolor eu malesuada vestibulum. Sed suscipit commodo nunc. ",
		votes: 5,
		upvote: 3,
		downvote: 2
	},
	{
		id: 2,
		createdOn: "21/12/2018",
		createdBy: 1, // represents the user asking the question
		meetup: 1, // represents the meetup the question is for
		title: "question 2",
		body: "Morbi at pellentesque elit. Donec vitae mi elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean suscipit, augue sit amet ultrices commodo, felis velit dictum enim, sit amet placerat enim justo sed est. Pellentesque quis euismod lorem. Donec ultrices vel ligula ac pellentesque. Nam pharetra vitae quam mollis ullamcorper. Sed hendrerit turpis enim, nec ornare sapien pulvinar ac. Aenean ultricies eu lorem at tincidunt. Nullam odio risus, luctus sed finibus non, commodo eu ante. Nam molestie sem ex, sit amet facilisis felis aliquam eu. ",
		votes: 0,
		upvote: 0,
		downvote: 0
	},
	{
		id: 3,
		createdOn: "11/12/2018",
		createdBy: 1, // represents the user asking the question
		meetup: 1, // represents the meetup the question is for
		title: "question 3",
		body: "Suspendisse potenti. Phasellus vel ullamcorper massa, eget tincidunt tellus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis non egestas tortor. Sed fermentum sodales est, ut fringilla diam aliquam vitae. Praesent aliquet interdum pellentesque. Pellentesque vel sagittis nunc. In tortor purus, pharetra facilisis faucibus sit amet, lobortis quis eros. Proin eget ligula dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur quam libero, maximus at orci at, viverra condimentum quam. Donec sed mauris congue, egestas ligula sit amet, tincidunt enim. Ut tincidunt, ex eu iaculis pharetra, nisl est sagittis ante, eu dignissim erat odio sit amet tellus. In euismod a urna eu rhoncus. Donec tincidunt sagittis ipsum in cursus. Mauris tincidunt nulla non auctor lobortis. ",
		votes: 10,
		upvote: 6,
		downvote: 4
	},
	{
		id: 4,
		createdOn: "09/12/2018",
		createdBy: 1, // represents the user asking the question
		meetup: 2, // represents the meetup the question is for
		title: "question 4",
		body: "Donec id massa eget justo mollis euismod. Curabitur rutrum neque orci, id sollicitudin turpis venenatis a. Suspendisse aliquet feugiat placerat. Nullam sed ex ut leo sodales rutrum. Ut fringilla metus efficitur enim volutpat, ut dapibus est mattis. Quisque non laoreet felis. Ut pharetra vehicula auctor. Vestibulum ullamcorper ex turpis. Morbi ante magna, pretium sed tristique in, lacinia nec sapien. Nunc quam nunc, molestie vel tempor eu, commodo ut mauris.",
		votes: 0,
		upvote: 0,
		downvote: 0
	},
	{
		id: 5,
		createdOn: "25/10/2018",
		createdBy: 1, // represents the user asking the question
		meetup: 1, // represents the meetup the question is for
		title: "question 2",
		body: "Nullam at molestie lacus. Aliquam ut vehicula ex. Nulla facilisi. Mauris viverra ac lacus tempus scelerisque. Curabitur pellentesque varius ipsum, ac pellentesque nunc feugiat non. Quisque non elementum augue. Ut a sagittis metus, et rhoncus dolor. ",
		votes: 0,
		upvote: 0,
		downvote: 0
	},
	{
		id: 6,
		createdOn: "01/12/2018",
		createdBy: 1, // represents the user asking the question
		meetup: 3, // represents the meetup the question is for
		title: "question 2",
		body: "Nam consequat id dolor at sodales. Sed pharetra sollicitudin sagittis. Duis imperdiet gravida dui ut ullamcorper. Fusce leo tellus, ultricies varius elementum id, dictum quis dui. Morbi eu sagittis nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec at vestibulum eros. Praesent id sapien id nunc molestie venenatis. Phasellus eget justo semper, mattis nisi id, viverra nisi. Etiam vel porta massa, ac venenatis tortor. Aenean euismod suscipit sagittis. In id interdum dolor.",
		votes: 0,
		upvote: 0,
		downvote: 0
	}
];

module.exports = questions;