import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import { validate } from "class-validator";
import { resolve } from "path";

class UserController {
  constructor() { }

  public getAllUsers(req: Request, res: Response, next: NextFunction) {
    // Add code to get all users
    res.status(200).json({ message: "Get all users!", users: [] });
  }

  public addUser(req: Request, res: Response, next: NextFunction) {
    const user = new User(
      req.body.username,
      req.body.email,
      parseInt(req.body.age, 10)
    );

    // console.log(book);
    validate(user, { validationError: { target: false } }).then(errors => {
      if (errors.length > 0) {
        res.status(500).json({ message: "Validation error", errors });
      } else {
        // Add user to db
        res.status(201).json({ message: "User added!", user });
      }
    });
  }
}

export default new UserController();
