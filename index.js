import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes/routes.js";
import cron from "node-cron";
import User from "./models/UserModel.js";
import "dotenv/config.js";

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_CONNECTION_STRING;

// const corsMiddleware = (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'https://dorm-deals-frontend.vercel.app')
//       .header('Access-Control-Allow-Headers', 'Authorization,Accept,Origin,DNT,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range')
//       .header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE,PATCH');

//   if (req.method === 'OPTIONS') {
//       res.sendStatus(200);
//   } else {
//       next();
//   }
// }

app.use(cors());

app.use(express.json());

app.use("/", routes);

// Schedule the cleanup task to run every minute
cron.schedule("* * * * *", async () => {
  const fiveMinutesAgo = new Date();
  fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);

  // Find unverified user records created more than 5 minutes ago
  const unverifiedUsers = await User.find({
    isVerified: false,
    createdAt: { $lt: fiveMinutesAgo },
  });

  console.log("Users going to be deleted : ", unverifiedUsers);
  // Delete unverified user records
  await User.deleteMany({
    _id: { $in: unverifiedUsers.map((user) => user._id) },
  });

  console.log("Cleanup task completed.");
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`Connected to MongoDB`);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
