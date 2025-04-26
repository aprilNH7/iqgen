// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     role: { type: String, required: true },
//     company: { type: String },
//     mobile: { type: String, required: true },
//     country: { type: String },
//     password: { type: String, required: true },
//     // dataPolicyChecked: { type: Boolean, default: false },
//     // ancillaryServicesChecked: { type: Boolean, default: false },
//     // channelPartnerChecked: { type: Boolean, default: false },
// }, { timestamps: true });


// module.exports = mongoose.model('User', userSchema);




const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String },
    company: { type: String },
    mobile: { type: String },
    country: { type: String },
    password: { type: String },
    googleId: { type: String, unique: true },
    facebookId: { type: String, unique: true },
    profileImage: { type: String, default: "" },
    
    // Reset Password Fields
    resetToken: { type: String },
    resetTokenExpiration: { type: Date },
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);