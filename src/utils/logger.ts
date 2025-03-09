import winston, { Logger, createLogger, format, transports } from "winston";

const customColors = {
  error: "red",
  warn: "yellow",
  info: "green",
  debug: "blue",
  verbose: "cyan",
};

winston.addColors(customColors);

export const winstonLogger = (name: string, level: string): Logger => {
  const logger: Logger = createLogger({
    level,
    exitOnError: false,
    defaultMeta: { service: name },
    format: format.combine(
      format.colorize(),
      format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      format.printf(({ level, message, timestamp }) => {
        return `[${timestamp}] [${level}] [${name}] ${message}`;
      })
    ),
    transports: [new transports.Console()],
  });

  return logger;
};
