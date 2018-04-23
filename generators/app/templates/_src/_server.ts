import * as express from 'express';
import * as logger from 'morgan';
import * as createError from 'http-errors';
import route from './routes/route';

export class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.configServer();
    this.mountRoutes();
  }

  private mountRoutes(): void {
    this.app.use('/', route.apiRouter);
  }

  private configServer() {
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    // catch 404 and forward to error handler
    this.app.use(function(err, req, res, next) {
      err.status = 404;
      next(createError(err));
    });

    // error handler
    this.app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.json('error');
    });
  }

  public static getServer(): Server {
    return new Server();
  }
}
