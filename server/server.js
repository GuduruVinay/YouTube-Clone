import express from "express";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Root Route
app.get('/', (req, res) => {
    res.json("Welcome To YouTube");
});

// Local Host at PORT
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`SERVER RUNNING AT PORT: ${PORT}`);
});