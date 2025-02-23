import { Schema, model, Document } from 'mongoose';

interface User extends Document {
  username: string;
  email: string;
  thoughts: string[]; // Array of thought IDs
  friends: string[]; // Array of friend IDs
}

const userSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const User = model<User>('User', userSchema);

export default User;
