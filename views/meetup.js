import express from 'express';

import controllers from '../controllers/meetup';

const router = express.Router();

// Routes for meetups
router.get('/upcoming', controllers.upcoming);
router.post('/', controllers.createMeetup);
router.get('/:id', controllers.getMeetup);
router.get('/', controllers.getAllMeetup);
router.delete('/:id', controllers.deleteMeetup);
router.post('/:id/rsvps', controllers.rsvpMeetup);
router.post('/:id/questions', controllers.postQuestion);

export default router;