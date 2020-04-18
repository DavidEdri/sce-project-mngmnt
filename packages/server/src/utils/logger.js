import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";
import { existsSync, mkdirSync } from "fs";

const env = process.env.NODE_ENV || "development";
const logDir = "log";
const envToLevel = () => {
  switch (env) {
    case "test":
      return 2;
    case "production":
      return 1;
    default:
      return 0;
  }
};

// Create the log directory if it does not exist
if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: `${logDir}/%DATE%-results.log`,
  datePattern: "DD-MM-YYYY"
});

export const logger = createLogger({
  // change level if in dev environment versus production
  level: envToLevel(),
  format: format.combine(
    format.timestamp({
      format: "DD-MM-YYYY HH:mm:ss"
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: envToLevel(),
      format: format.combine(
        format.colorize(),
        format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      )
    }),
    dailyRotateFileTransport
  ]
});

export const logError = (err, req = null) => {
  const userMsg = req.user
    ? `userID: ${req.user._id}\n  user email:${req.user.email}`
    : "";

  if (req.body.password) {
    delete req.body.password;
  }

  if (req.body.password2) {
    delete req.body.password2;
  }

  const bodyMsg = `body:${JSON.stringify(req.body)}`;
  const url = req ? req.originalUrl : "";

  logger.error(`
  url:${url}
  ${userMsg}
  ${bodyMsg}
  error:${err}
  `);
};

export const logENew = (err, req = null) => {
  const userMsg = req.user? `userID: ${req.user._id}\n  user email:${req.user.email}`: "";

  if (req.body.password) { delete req.body.password;}
  if (req.body.password2) {delete req.body.password2;}

  const bodyMsg = `body:${JSON.stringify(req.body)}`;
  const url = req ? req.originalUrl : "";

  logger.error(`
  url:${url}
  ${userMsg}
  ${bodyMsg}
  error:${err}
  `);
};