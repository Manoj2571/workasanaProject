const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // Project names must be unique
    description: { type: String }, // Optional field for project details
    createdAt: { type: Date, default: Date.now }
   }, {timestamps: true});



module.exports = mongoose.model('Project', projectSchema);
   