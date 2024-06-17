import path from "node:path";

const ERROR_LOG_PATH = path.resolve("log", "error.log");
const COMBINED_LOG_PATH = path.resolve("log", "combined.log");
const MAX_SIZE = 5 * 1024 * 1024 * 8; // 5 mb
const MAX_FILES = 5;

export { ERROR_LOG_PATH, COMBINED_LOG_PATH, MAX_SIZE, MAX_FILES };
