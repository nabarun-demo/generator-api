import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user";
import DA from "../dataaccess";
import { validate } from "class-validator";

class UserController {
  constructor() { }
  public async getAllUsers(req: Request, res: Response, next: NextFunction) {
    await DA.getAllUsers()
      .then(data => {
        const u = data.map(doc => new UserModel(doc));
        res.status(200).json({ message: "Get all users!", users: u });
      })
      .catch(err => {
        // console.log(`From DB server: ${err}`);
        res.status(500).json({
          message: "Error while getting users"
        });
      });
  }

  public async addUser(req: Request, res: Response, next: NextFunction) {
    const user = new UserModel();
    user.username = req.body.username;
    user.email = req.body.email;
    user.age = parseInt(req.body.age, 10);
    validate(user, { validationError: { target: false } }).then(errors => {
      if (errors.length > 0) {
        res.status(500).json({
          message: "Validation error",
          errors
        });
      } else {
        DA.addUser(user)
          .then(data => {
            const u = new UserModel(data);
            res.status(200).json({ message: "success", user: u });
          })
          .catch(err => {
            // console.log(`From DB server: ${err}`);
            res.status(500).json({ message: "Error while adding user" });
          });
      }
    });
  }
}

export default new UserController();
