import { Document } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  age: number;
}

export default IUser;
