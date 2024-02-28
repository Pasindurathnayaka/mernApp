// dotenv
require('dotenv').config();

// import express
const express = require('express')

// import mongoose
const mongoose = require('mongoose');

// import multer
const multer = require('multer');

// Import cors module
const cors = require('cors');

const Image = require('./models/image');

// import blog routes module
const blogRoutes = require('./routes/blogRoutes');

// import user routes module
const authRoutes = require('./routes/authRoutes');

// const bodyParser = require('body-parser');

// express application
const app = express();

// app.use(bodyParser.json());

// middleware
app.use(express.json());

//method to show the rest api call in the console
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Use cors module and enable all CORS requests
app.use(cors());

// use blog routes module
app.use('/api/v1/blogs', blogRoutes);

// use user routes module
app.use('/api/v1/users', authRoutes);

app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage
});

app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file);
    Image.create({
        image: req.file.filename},
).then(result => res.json(result))
.catch(err => console.log(err))
})

app.get('/getImage', (req, res) => {  
    Image
    .find().then(result => res.json(result))
    .catch(err => console.log(err))
})

app.get('/getImage/:id', async (req, res) => {
    try {
      const image = await Image.findById(req.params._id);
      if (!image) {
        return res.status(404).json({ error: 'Image not found' });
      }
  
      // Assuming image is stored in a 'uploads' directory
      const imagePath = path.join(__dirname, 'uploads', image.image);
      res.sendFile(imagePath);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });  

//connect to db
mongoose
    .connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME })
    .then(() => {

        console.log(`connected to the database ${process.env.DB_NAME}`);

        app.listen(process.env.PORT, (req, res) => {
            console.log(`Backend server is running on server ${process.env.PORT}`);
        })

    })
    .catch(Error => {
        console.log(Error);
    });

// export app
module.exports = app;