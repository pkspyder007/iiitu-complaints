import { Request } from "express";
import morgan from "morgan";
import moment from "moment-timezone";
import { createLogger, transports, format } from "winston";

morgan.token("userId", (req: Request) => {
  return `USER - ${req?.user?._id ?? "*"}`;
});

morgan.token("date", () => {
  return moment().tz('Asia/Calcutta').format("Do MMM YYYY : LTS");
});

morgan.format('custom', '[:date] ":userId" ":method :url" :status :res[content-length] - :response-time ms');

export const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: "DD MMM YYYY" }),
    format.printf((info: any) => `${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.File({
      filename: "./logs/all-logs.log",
      maxsize: 5242880,
      maxFiles: 5,
    }),
    new transports.Console(),
  ],
});

export const httpLogger = morgan(
  "custom",
  {
    stream: {
      write: (message) =>
        logger.info(message.substring(0, message.lastIndexOf("\n"))),
    },
  }
);
