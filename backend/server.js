const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require("cookie-parser");

// routes
const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");
const authRoutes = require("./routes/authRoutes");

// express
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000', // React URL
    credentials: true, // Allow sending credentials like cookies
}));

// use routes
app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/auth", authRoutes);

// root endpoint
app.get("/", (req, res) =>
    res.send("MERN Stack API Running"));

// port
const PORT = process.env.PORT || 5000;

// mongodb
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.log(err));
