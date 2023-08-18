const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");

// path for config 
dotenv.config();

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Imports Routes
const userRoutes = require('./server/routes/userRoutes');
const clubRoutes = require('./server/routes/clubRoutes');
const taskRoutes = require('./server/routes/taskRoutes');
const subtaskRoutes = require('./server/routes/subtaskRoutes');
app.use('/api/v1', userRoutes);
app.use('/api/v1', clubRoutes);
app.use('/api/v1', taskRoutes);
app.use('/api/v1', subtaskRoutes);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Middleware for Errors
const errorMiddleware = require("./server/middleware/error");
app.use(errorMiddleware);

module.exports = app;
