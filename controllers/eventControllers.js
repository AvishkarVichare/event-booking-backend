const Event = require('../models/Events.Shcema');

exports.createEventController = async (req, res) => {
  try {

    if ((req.user.role !== 'admin'))
      throw new Error("only admin can access");
    // console.log(req.file)

    const image = {
      filename: req.file.originalname,
      data: req.file.path
    }

    const { eventName, eventHost, eventDescription, eventBranch, eventDate, eventTime, eventVenue, eventType, eventPrice, eventMode } = req.body;



    // const upImage = req.file
    // console.log(upImage)
    // const base64Image = Buffer.from(upImage.data).toString('base64');


    const event = await Event.create({
      eventName,
      eventHost,
      eventDescription,
      eventBranch,
      eventDate,
      eventTime,
      eventVenue,
      eventType,
      eventMode,
      eventPrice,
      image
    });

    res.json({
      event,
      success: true,
      message: "event created"
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

exports.getEventsController = async (req, res) => {
  try {
    const events = await Event.find().sort({ field: 'asc', _id: -1 });

    res.json({
      events,
      success: true,
      message: 'Events retrieved'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

exports.editEventInfoController = async (req, res) => {
  try {

    if (req.user.role !== 'admin')
      throw new Error("only admin can perform");

    const updates = req.body;
    console.log(updates)
      const event = await Event.findByIdAndUpdate(req.params.eid, updates, { new: true })
      return res.json({
        success: true,
        message: "event info edited successfully"
      })

   
  }
  catch (err) {
    res.status(500).json({ message: 'Error editing event', err: err.message });
  }
}
exports.editEventImgController = async (req, res) => {
  try {

    if (req.user.role !== 'admin')
      throw new Error("only admin can perform");

    const updates = req.body;
    console.log("This is image", updates.image)

    const image = {
      filename: req.file.originalname,
      data: req.file.path
    }

    // console.log({updates:req.body})

    const event = await Event.findByIdAndUpdate(req.params.eid, { ...updates, image }, { new: true })

    res.status(200).json({
      success: true,
      message: "edited successfully"
    })
  }
  catch (err) {
    res.status(500).json({ message: 'Error editing event', err: err.message });
  }
}

exports.deleteEventController = async (req, res) => {
  try {

    if (req.user.role !== 'admin')
      throw new Error("only admin can perform");


    const eventId = req.params.eid;
    const event = Event.findByIdAndDelete(eventId, (error) => {
      if (error) {
        throw error;
      }
      res.json({
        success: true,
        message: 'Event successfully deleted'
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event' });
  }
}

exports.getEventByIdController = async (req, res) => {
  try {

    const event = await Event.findById(req.params.eveId);
    if (!event) {
      throw new Error("no such event exitst");
    }

    res.status(200).json({
      event,
      success: true,
      message: 'Successfully retrieved event'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }

}

exports.bookEventController = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eveId);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!event)
      throw new Error("no such event");

    //  payment verify 

    let body = razorpay_order_id + "|" + razorpay_payment_id;

    var crypto = require("crypto");
    var expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest('hex');
    console.log("sig received ", razorpay_signature);
    console.log("sig generated ", expectedSignature);

    // var response = { "signatureIsValid": "false" }

    if (expectedSignature !== razorpay_signature)
      throw new Error("Can't book without payment!")

    // response = { "signatureIsValid": "true" }

    // booking starts 
    if (event.bookedUsers.includes(req.user.id))
      throw new Error("You have already booked for this");

    event.bookedUsers.push(req.user.id);
    await event.save();

    res.status(200).json({
      event,
      success: true,
      message: 'Successfully booked event'
    })


  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

exports.unBookEventController = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eveId);

    if (!event)
      throw new Error("no such event");

    if (!(event.bookedUsers.includes(req.user.id)))
      throw new Error("You haven't booked for this");


    console.log(event.bookedUsers.indexOf(req.user.id))
    event.bookedUsers.splice(event.bookedUsers.indexOf(req.user.id), 1);
    await event.save();

    res.status(200).json({
      event,
      success: true,
      message: 'Successfully unbooked event'
    })


  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

exports.getUserBookedEvents = async (req, res) => {
  try {
    const events = await Event.find({ bookedUsers: req.user.id }).sort({ field: 'asc', _id: -1 })


    res.json(
      {
        success: true,
        message: "retrived succesfully",
        events
      }
    )


  }
  catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

exports.searchEventsController = async (req, res)=>{
  try{
      const searchTerm = req.query.search;
     const events = await Event.find({eventName: {$regex: searchTerm, $options: 'i'}});
    res.status(200).json({
      success: true,
      messsage: "successfully reitrived",
      events
    })
  }
  catch(err){
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}
