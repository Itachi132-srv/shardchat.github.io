const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    password: { type: String, required: true },
    bio: { type: String, default: "Hey there! I am using this app." },
    pfp: { type: String, default: "" },
    banner: { type: String, default: "" },
    status: { type: String, enum: ['online', 'offline', 'idle', 'dnd'], default: 'offline' },
    lastSeen: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);

