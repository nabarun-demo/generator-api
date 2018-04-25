import * as express from "express";
import ba from "../controllers/userController";

class Routes {
  public apiRouter: express.Router;

  constructor() {
    this.apiRouter = express.Router();
    this.configRoutes();
  }

  configRoutes(): void {
    this.apiRouter.get("/", (req, res) => {
      res.json({
        message: "Welcome to cytel demo API!"
      });
    });

    this.apiRouter.get("/user", ba.getAllUsers);

    this.apiRouter.post("/user", ba.addUser);
  }
}

export default new Routes();
