import express, { Express, IRouter } from "express";
import { connectToDB } from "./db";

interface ServerInitOptions {
  port: Number;
  dbUri: string;
}

class Server {
  _app: Express;
  constructor() {
    this._app = express();
  }

  addMiddleware(middleware: MiddleWareFn): Server {
    this._app.use(middleware);
    return this;
  }

  addRouter(router: IRouter): Server {
    this._app.use(router);
    return this;
  }

  async init({ port, dbUri }: ServerInitOptions) {
    await connectToDB(dbUri);
    this._app.listen(port, () => {
      console.log(`Server started on port : ${port}`);
    });
  }
}
export default Server;
