import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import List from "./models/List.js";

const app = express();
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

// Middleware
app.use(express.json());

// getting all the tasks
app.get("/", async (req, res) => {
  try {
    const getAllTasks = await List.find({});
    res.render("list", { kindOfDay: "Today", finalList: getAllTasks });
  } catch (err) {
    res.status(500).json(err);
  }
});

// creating task
app.post("/", async (req, res) => {
  const newTask = new List(req.body);
  try {
    const saveTask = await newTask.save();
    res.status(200).redirect("/");
  } catch (err) {
    res.status(500).json(err);
  }
});

// deleting the task
app.post("/delete", async (req, res) => {
    try {
    await List.findByIdAndDelete(req.body.index);
    res.redirect("/");
    } catch(err){
        res.status(500).json(err)
    }
});

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/todoDB");
    console.log("Connected to MongoDB!");
  } catch (err) {
    throw err;
  }
};

app.listen(process.env.PORT || port, () => {
  console.log("Server is running at port: " + port + "/" + process.env.PORT);
  connectDB();
});