const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


// User Schema
const userSchema = new mongoose.Schema({
 name: { type: String, required: true }, // User's name
 email: { type: String, required: true, unique: true }, // Email must be unique
 password: {type: String, required: true, select: false}   
}, {timestamps: true});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
  
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  });


module.exports = mongoose.model('User', userSchema);

