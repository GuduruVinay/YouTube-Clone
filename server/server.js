import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Configure dotenv
dotenv.config();

// Express Instance
const app = express();

// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => { console.log("MongoDB Connected") })
.catch((err) => { console.log("MongoDB Connection Error: ", err) })

// Middleware to parse JSON bodies
app.use(express.json());

// Root Route
app.get('/', (req, res) => {
    res.json("Welcome To YouTube");
});

// Local Host at PORT
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`SERVER RUNNING AT PORT: ${PORT}`);
});