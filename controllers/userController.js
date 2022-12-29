const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User.Schema')


exports.signUpUserController = async (req, res) => {
  try {
    const { name, email, username, password, phone, div, studentid, branch } = req.body;

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
      branch


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
