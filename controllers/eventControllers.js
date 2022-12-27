const Event = require('../models/Events.Shcema');

exports.createEventController = async (req, res) => {
  try {

    if ((req.user.role !== 'admin'))
      throw new Error("only admin can access");


    const { eventName, eventHost, eventBranch, eventDate, eventTime, eventVenue, eventType } = req.body;

    const event = await Event.create({
      eventName,
      eventHost,
      eventBranch,
      eventDate,
      eventTime,
      eventVenue,
      eventType
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
    const events = await Event.find();

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

    if (!event)
      throw new Error("no such event");

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


