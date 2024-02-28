// import mongoose
const mongoose = require('mongoose');

// create a schema
const {Schema} = mongoose;

//define the schema
const imageSchema = new Schema({

    image: {
        type: String
    }
});

// create the module
const Image = mongoose.model("Image", imageSchema);

//export the module
module.exports = Image;