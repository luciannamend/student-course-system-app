const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// routes
const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");

// express
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);

// port
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => res.send("MERN Stack API Running"));

// mongodb
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.log(err));
