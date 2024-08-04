const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 5000;

app.use(express.json());

const DB_URI = "mongodb://127.0.0.1:27017";

const connectDB = async()=>{
try{
    await mongoose.connect(DB_URI);
    console.log("MongoDB connected successfully");
}

catch(err)
{
    console.log("MongoDB connection error:", err);
}

};

connectDB();

const userRoutes = require('./routes/user.routes.js');

const discussionRoutes = require('./routes/discussion.routes.js');

app.use('/user', userRoutes);
app.use('/discussions', discussionRoutes);


app.get('/', (req,res)=>{
    res.send("Welcome to the Discussion Forum");
 });


app.listen(PORT, () => {
    console.log(`Server listening at PORT ${PORT}`);
  });