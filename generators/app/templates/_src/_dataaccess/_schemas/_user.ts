import { Schema, Model, model } from "mongoose";
import IU from "./IUser";

// book schema definition
const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true, min: 1 },
  createdAt: { type: Date, default: Date.now }
});

// Sets the createdAt parameter equal to the current time
userSchema.pre("save", next => {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

const User: Model<IU> = model<IU>("user", userSchema);

export default User;
