const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User.Schema')
const Event = require('../models/Events.Shcema');


exports.signUpUserController = async (req, res) => {
  try {
    const { name, email, username, password, phone, div, studentid, branch, collegname } = req.body;

    const salt = await bcrypt.genSalt(10);
    const secretPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      username,
      password: secretPassword,
      phone,
      div,
      studentid,
      branch,
      collegname


    });


    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

    res.json({
      token,
      success: true,
      message: 'Successfully signed up'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

exports.loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email or password is incorrect' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email or password is incorrect' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

    res.json({
      token,
      success: true,
      message: 'Successfully logged in'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

exports.getUserController = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    } else {
      res.json({
        message: 'success',
        user: user
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }

}

exports.getUsersWhoBookedEvent = async (req, res) => {
  try {
    if (req.user.role !== 'admin')
      throw new Error("only admin can access");

    const event = await Event.findById(req.params.eid).populate('bookedUsers')
    // console.log(event.bookedUsers); 

    // console.log("first", event)

    res.json({
      success: true,
      message: "users retrived",
      users: event.bookedUsers
    })


  }
  catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }

}


exports.signUpAdminController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10)
    const secretPassword = await bcrypt.hash(password, salt);

    if(!email.includes("teacher"))
      throw new Error("Only teachers can login")

    let generatedUsername = name.replace(/\s/g, "").toLowerCase()
    
    const user = await User.create({
      name,
      email,
      username: generatedUsername,
      password: secretPassword,
      phone: 0,
      div: "N/A",
      studentid: "N/A",
      branch: "N/A",
      collegname: "N/A",
      role: "admin"

    });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);


    res.json({
      success: true,
      token
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

exports.editUserController = async (req, res) => {
  try {
    const updates = req.body;

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true, // Return the updated user
    });

    if(!user)
      throw new Error("no user found")

    res.json({
      success: true,
      user
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}