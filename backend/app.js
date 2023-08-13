const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const cloudinary = require("cloudinary");

// path for config 
dotenv.config({ path: "./.env" });
const port = process.env.PORT || 80;


// import db    
const connectDB = require("./server/database/connections");
// connecting to database 
connectDB();

app.use(express.json({
    limit: '50mb'
}));
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));


// import routes
const userRoutes = require('./server/routes/userRoutes');
const clubRoutes = require('./server/routes/clubRoutes');
const taskRoutes = require('./server/routes/taskRoutes');
const subtaskRoutes = require('./server/routes/subtaskRoutes');
app.use('/api/v1', userRoutes);
app.use('/api/v1', clubRoutes);
app.use('/api/v1', taskRoutes);
app.use('/api/v1', subtaskRoutes);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
})