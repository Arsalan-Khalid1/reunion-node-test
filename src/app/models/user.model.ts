import mongoose, { Schema, model } from 'mongoose';

interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  followers: mongoose.Schema.Types.ObjectId[];
  following: mongoose.Schema.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true
  }]
}, {timestamps: true});

const User = model<IUser>('User', userSchema);

export default User;