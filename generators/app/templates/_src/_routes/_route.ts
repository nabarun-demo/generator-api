import * as express from 'express';
import ba from '../controllers/bookController';

class Routes {
  public apiRouter: express.Router;

  constructor() {
    this.apiRouter = express.Router();
    this.configRoutes();
  }

  configRoutes(): void {
    this.apiRouter.get('/', (req, res) => {
      res.json({
        message: 'Welcome to demo API!'
      });
    });

    this.apiRouter.get('/book', ba.getAllBooks);

    this.apiRouter.post('/book', ba.addBook);
  }
}

export default new Routes();
