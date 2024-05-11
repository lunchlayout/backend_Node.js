import { createLogger, format, transports } from "winston";
import {
	COMBINED_LOG_PATH,
	ERROR_LOG_PATH,
	MAX_FILES,
	MAX_SIZE,
} from "../consts/logger.js";
import stripAnsi from "strip-ansi";

const fileFormat = format.combine(
	format.timestamp(),
	format.json({
		replacer: (key, value) => {
			if (key === "message" && typeof value === "string")
				return stripAnsi(value);
			else return value;
		},
	}),
	format.uncolorize(),
);

const consoleFormat = format.combine(
	format.colorize(),
	format.printf(({ level, message }) => `[${level}]: ${message}`),
);

const logger = createLogger({
	level: "debug",
	transports: [
		new transports.File({
			filename: ERROR_LOG_PATH,
			level: "error",
			maxsize: MAX_SIZE,
			maxFiles: MAX_FILES,
			format: fileFormat,
		}),
		new transports.File({
			filename: COMBINED_LOG_PATH,
			maxsize: MAX_SIZE,
			maxFiles: MAX_FILES,
			format: fileFormat,
		}),
	],
});

const isDev = process.env.NODE_ENV === "development";

if (isDev) {
	logger.add(
		new transports.Console({
			format: consoleFormat,
		}),
	);
}

export { logger };
