const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');




// Register a new user
exports.registerUser = async function (req, res) {
  const { firstName, lastName, email, role, company, mobile, country, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const user = new User({
      firstName, lastName, email, role, company, mobile, country,
      password: hashedPassword
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};



// Login user
exports.loginUser = async function (req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Store user session
    req.session.user = {
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };

    res.status(200).json({
      message: 'Login successful',
      user: req.session.user, // Send back session data
    });

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};



//Google-login
exports.googleLogin = async function (req, res) {
  try {
    const { firstName, lastName, email, googleId } = req.body;

    if (!email || !googleId) {
      return res.status(400).json({ message: "Invalid Google login data" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ firstName, lastName, email, googleId });
      await user.save();
    }

    // Store user details in session instead of returning a token
    req.session.user = {
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      googleId: user.googleId,
    };

    res.json({
      message: "Google login successful",
      user: req.session.user, // Send session user info
    });

  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



//Facebook-login
exports.facebookLogin = async function (req, res) {
  try {
    const { firstName, lastName, email, facebookId } = req.body;

    if (!email || !facebookId) {
      return res.status(400).json({ message: "Invalid Facebook login data" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ firstName, lastName, email, facebookId });
      await user.save();
    }

    // Store user details in session
    req.session.user = {
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      facebookId: user.facebookId,
    };

    res.json({
      message: "Facebook login successful",
      user: req.session.user, // Send session user info
    });

  } catch (error) {
    console.error("Facebook login error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


// Forgot Password 
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: 'User not found' });

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send email with reset link
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: { user: 'developer@logicalquad.com', pass: 'd*NWXuH*9*Pb3glfc' },
    });

    const mailOptions = {
      to: email,
      from: 'developer@logicalquad.com',
      subject: 'Password Reset Request',
      text: `Click the link to reset your password: https://iqgen.energy/reset-password/${resetToken}`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) return res.status(500).json({ message: 'Error sending email' });
      res.json({ message: 'Password reset link sent to your email' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};



// Reset Password 
exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.json({ message: 'Password has been reset. Please log in with your new password.' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};





//Get user Detail
exports.getUserDetails = async function (req, res) {
  try {
    if (!req.session.user){
      return res.status(401).json({ message: "Not authenticated" });
    }
    // Fetch full user details from the database
    const user = await User.findById(req.session.user.userId).select("firstName lastName email country mobile role company profileImage");
    if (!user)
    {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  }
  catch (error)
  {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// exports.getUserDetails = async function (req, res) {
//   try {
//       if (!req.session.user) {
//           return res.status(401).json({ message: "Not authenticated" });
//       }

//       res.status(200).json({ user: req.session.user });
//   } catch (error) {
//       console.error("Error fetching user details:", error);
//       res.status(500).json({ message: "Server error" });
//   }
// };


// Get all users
exports.getAllUsers = async function (req, res) {
  try {
      const users = await User.find({}, "firstName lastName email role"); // Fetching only necessary fields
      res.status(200).json({ users });
  } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};



//Update user details
exports.updateUserDetails = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const { firstName, lastName, email, phone, country, company } = req.body;

    // Check if the email is already in use by another user
    const existingUser = await User.findOne({ email, _id: { $ne: req.session.user.userId } });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // Update user details
    const updatedUser = await User.findByIdAndUpdate(
      req.session.user.userId,
      { firstName, lastName, email, phone, country, company },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// Upload Profile Image Controller
exports.uploadProfileImage = async function (req, res) {
  try {
    const { userId } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    const imagePath = `${req.file.filename}`; // Correct path

    const updatedUser = await User.findByIdAndUpdate(userId, { profileImage: imagePath }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Profile image updated successfully', imageUrl: imagePath }); // Send full path
  } catch (error) {
    console.error('Error uploading profile image:', error);
    res.status(500).json({ message: 'Error uploading image' });
  }
};