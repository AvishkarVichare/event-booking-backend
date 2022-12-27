const express = require('express');
const router = express.Router();
const {createEventController, getEventsController, getEventByIdController, bookEventController, unBookEventController} = require('../controllers/eventControllers');
const authUser = require('../middlewares/authUser');

router.post('/create',authUser,  createEventController);
router.get('/getEvents',authUser, getEventsController);
router.get('/getEvent/:eveId', authUser, getEventByIdController )
router.post('/bookEvent/:eveId', authUser, bookEventController )
router.post('/unBookEvent/:eveId', authUser, unBookEventController )


module.exports = router;
