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

  configRoutes(): void {
    this.apiRouter.get("/", (req, res) => {
      res.render('index', { title: 'Express' });
    });

    this.userRouter.get("/", ba.getAllUsers).post("/", ba.addUser);
  }
}

export default new Routes();
