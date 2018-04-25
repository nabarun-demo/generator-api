import mongoose = require("mongoose");
import User from "./schemas/user";
import IU from "./schemas/IUser";

const mongoDBURI =
  "mongodb://admin:admin123@cluster0-shard-00-00-ltme4.mongodb.net:27017,cluster0-shard-00-01-ltme4.mongodb.net:27017,cluster0-shard-00-02-ltme4.mongodb.net:27017/books?authSource=admin&replicaSet=Cluster0-shard-0&ssl=true";

class DataAccess {
  constructor() {
    mongoose.connect(mongoDBURI);
    mongoose.Promise = global.Promise;
    mongoose.connection.on(
      "error",
      console.error.bind(console, "MongoDB connection error: ")
    );
  }

  getAllUsers(): Promise<IU[]> {
    return new Promise((resolve, reject) => {
      let query = User.find({}).sort("-createdAt");
      query.exec((err, data) => {
        if (err) {
          reject("Some Error, Contact DAL Developer.");
        }

        console.log(data[0]);
        resolve(data);
      });
    });
  }

  addUser(user: any): Promise<IU> {
    let b = new User(user);
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
