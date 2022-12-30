const express = require('express');
const router = express.Router();
const {createEventController, getEventsController, getEventByIdController, bookEventController, unBookEventController, getUserBookedEvents, deleteEventController, editEventInfoController, editEventImgController, searchEventsController} = require('../controllers/eventControllers');
const authUser = require('../middlewares/authUser');
const upload = require('../utils/fileUpload');


router.post('/create' , upload.single('image'),  authUser,  createEventController);
router.get('/getEvents',authUser, getEventsController);
router.put('/edit/:eid',authUser, editEventInfoController);
router.put('/editimage/:eid', upload.single('image'),authUser, editEventImgController);
router.delete('/delete/:eid',authUser, deleteEventController);
router.get('/getEvent/:eveId', authUser, getEventByIdController );
router.post('/bookEvent/:eveId', authUser, bookEventController );
router.post('/unBookEvent/:eveId', authUser, unBookEventController );
router.get('/getBookedEvents', authUser, getUserBookedEvents );
router.get('/searchEvents', authUser, searchEventsController);



module.exports = router;
