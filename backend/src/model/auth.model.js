import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false,
    },
    bio: {
        type: String,
        default: '',
    },
    profilePic: {
        type: String,
        default: 'https://www.w3schools.com/howto/img_avatar.png',
    },
    nativeLanguage: {
        type: String,
        default: '',
    },
    learningLanguage: {
        type: String,
        default: '',
    },
    location: {
        type: String,
        default: '',
    },
    isOnBoarded: {
        type: Boolean,
        default: false,
    },
    friends: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

}, {
    timeStamp: {
        type: Date,
        default: Date.now,
        required: true,
    }
});
// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            const salt = await bcryptjs.genSalt(10);
            this.password = await bcryptjs.hash(this.password, salt);
        }
        next();
    } catch (error) {
        console.error('Error during password hashing:', error);
        next(error);
    }
});

export const User = mongoose.model('User', userSchema);


