import mongoose from 'mongoose';

export interface UserSchema {
    phoneNumber: string;
    email: string;
    password: string;
    fullName: string;
    role: mongoose.Types.ObjectId;
    dayOfBirth: Date;
}
