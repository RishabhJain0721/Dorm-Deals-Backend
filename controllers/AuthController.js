import nodemailer from "nodemailer";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "rishujain0721@gmail.com", // Replace with your admin email address
    pass: "nbmwdajxwxgzopqo", // Replace with your admin email password
  },
});

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  // Generate a verification token
  const verificationToken = jwt.sign({ email }, "your_secret_key", {
    expiresIn: "1d", // Token expires in 1 day
  });

  // Create a new user with the verification token
  const newUser = new User({
    name,
    email,
    password,
    isVerified: false,
    verificationToken,
  });

  try {
    await newUser.save();

    // Send a verification email to the user as the admin
    const verificationLink = `https://dorm-deals-frontend.vercel.app/verify-email?token=${verificationToken}`;

    await transporter.sendMail({
      from: "rishujain0721@gmail.com", // Replace with your admin email address
      to: email,
      subject: "Verify your email",
      text: `Click the following link to verify your email: ${verificationLink}`,
    });

    res.send({
      message: "Signup successful. Please check your email for verification.",
    });
  } catch (error) {
    res.status(500).send({ message: "Signup failed. Please try again later." });
  }
};

const login = async (req, res) => {
  console.log(req.body);
  console.log("Login request received");
  res.send({ message: "Login request received" });
};

const verifyEmail = async (req, res) => {
  const { token } = req.query;
  console.log(token);

  try {
    // Verify the token and find the user
    const decoded = jwt.verify(token, "your_secret_key");
    const user = await User.findOne({ email: decoded.email });
    console.log("Entered");
    if (user) {
      user.isVerified = true;
      await user.save();
      res.send({ message: "Email verification successful." });
    } else {
      res
        .status(404)
        .send({ message: "Invalid token. Email verification failed." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Email verification failed." });
  }
};

export { signup, login, verifyEmail };
