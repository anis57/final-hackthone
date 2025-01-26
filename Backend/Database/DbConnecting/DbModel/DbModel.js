import mongoose from "mongoose";

const UserDatabaseSchema = mongoose.Schema({
    name: {
        type: String,
        Required: true
    },
    cnic: {
        type: String,
        Required: true
    },
    email: {
        type: String,
        Required: true
    },
    password: {
        type: String,
        Required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordTokenExpire: {
        type: Date,
    }
}, {timestamps: true });

const alluser = mongoose.model('all_user', UserDatabaseSchema);

export default alluser