import Server from "./lib/server";
import config from "./lib/config";
import cors from "cors";
import * as express from "express";
import helmet from "helmet";
import routers from "./routes";
import cookieParser from "cookie-parser";
import { httpLogger } from "./middlewares/logger";

/* Create new server instance */
const app = new Server();

/* Add middlewares */
app
    .addMiddleware(express.json())
    .addMiddleware(cors())
    .addMiddleware(express.urlencoded({ extended: false }))
    .addMiddleware(helmet())
    .addMiddleware(cookieParser())
    .addMiddleware(httpLogger)

/* Add Router */
Object.values(routers).forEach(router => {
    app
        .addRouter(router);
});

/* Start server to listen to requests */

if(process.env.PORT) {
    config.set("PORT", process.env.PORT);
}

app.init({
    port: config.get("PORT"),
    dbUri: config.get("DB_URI")
}).catch(err => {
    throw new Error(err);
});