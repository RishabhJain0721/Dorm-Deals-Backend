import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes/routes.js";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: "https://dorm-deals-frontend.vercel.app/",
  })
);
app.options("*", cors());

app.use(express.json());

app.use("/", routes);

mongoose
  .connect(
    "mongodb+srv://rishujain0721:1234560@cluster0.diqnynf.mongodb.net/ecommerce"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
