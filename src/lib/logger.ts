import { createLogger, format, transports } from "winston";
import { env } from "~/env";

const loggerOptions = {
  level: "info",
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: "lengis" },
  transports: [
    new transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    new transports.File({
      filename: "logs/combined.log",
    }),
  ],
};

const logger = createLogger(loggerOptions);

if (env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      level: "debug",
      format: format.simple(),
    }),
  );
}

export default logger;
