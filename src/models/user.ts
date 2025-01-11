import mongoose, { Schema } from "mongoose";
import { User } from "../types/user";

const userSchema: Schema<User> = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
});

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;