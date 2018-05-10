import mongoose = require("mongoose");
import User from "./schemas/user";
import IU from "./schemas/IUser";

const mongoDBURI = "<%= dbcon %>";

class DataAccess {
  constructor() {
    mongoose.connect(mongoDBURI);
    mongoose.Promise = global.Promise;
    mongoose.connection.on(
      "error",
      console.error.bind(console, "MongoDB connection error: ")
    );
  }

  public getAllUsers(): Promise<IU[]> {
    return new Promise((resolve, reject) => {
      const query = User.find({}).sort("-createdAt");
      query.exec((err, data) => {
        if (err) {
          reject("Some Error, Contact DAL Developer.");
        }

        console.log(data[0]);
        resolve(data);
      });
    });
  }

  public addUser(user: any): Promise<IU> {
    const b = new User(user);
    return new Promise((resolve, reject) => {
      b.save(err => {
        if (err) {
          reject("Some Error, Contact DAL Developer.");
        }

        resolve(b);
      });
    });
  }
}

export default new DataAccess();
