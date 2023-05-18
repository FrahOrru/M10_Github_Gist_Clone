import mongoose, { Document, Model, Schema } from 'mongoose';

export interface UserModel extends Document {
  username: string;
  password: string;
}

const userSchema: Schema<UserModel> = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User: Model<UserModel> = mongoose.model<UserModel>('User', userSchema);

export default User;