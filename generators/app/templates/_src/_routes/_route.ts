import * as express from "express";
import ba from "../controllers/userController";

class Routes {
  public apiRouter: express.Router;
  public userRouter: express.Router;

  constructor() {
    this.apiRouter = express.Router();
    this.userRouter = express.Router();
    this.configRoutes();
  }

  public configRoutes(): void {
    this.apiRouter.get("/", (req, res) => {
      res.json({
        message: "Welcome to cytel demo API!"
      });
    });

    this.userRouter.get("/", ba.getAllUsers).post("/", ba.addUser);
  }
}

export default new Routes();
