// import mongoose
const mongoose = require('mongoose');

// create a schema
const {Schema} = mongoose;

//define the schema
const blogSchema = new Schema({

    schoolCode: {
        type: String,
        required: true
    },
    schoolName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    machineType: {
        type: String,
        required: true
    },
    length: {
        type: String,
        required: true
    },
    footSize: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    studentCount: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },

    designcode: {
        type: String,
        required: true
    },

    nitting: {
        type: String,
        required: true
    }
    
});

// create the module
const Blog = mongoose.model("Blog", blogSchema);

//export the module
module.exports = Blog;