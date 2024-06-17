import express from "express";
import path from "node:path";
import {createServer as createHTTPSServer} from "node:https";
import { IncomingMessage, Server, ServerResponse } from "node:http";
import { readFileSync } from "node:fs";
import cors from "cors";
import helmet from "helmet";
import { successLog, ConfigHelper, logger } from "./lib/index.js";
import { mainRouter } from "./routers/index.js";
import { connect, disconnect } from "mongoose";
import { errorHandler } from "./middlewares/errorHandler.js";

const configHelper = new ConfigHelper(path.resolve("config.yaml"));

const { server, database: db, clients } = configHelper;
const isHTTPS = server.protocol === 'https';

const app = express();

app.use(express.json());
app.use(
	helmet({
		crossOriginEmbedderPolicy: false,
		crossOriginResourcePolicy: false,
	}),
);
app.use(
	cors({
		origin: clients.length ? configHelper.getClientsOrigin() : "*",
	}),
);

app.use("/assets", express.static(path.resolve("public")));
app.use("/api", mainRouter);

app.use(errorHandler);

let HTTPSServer: Server<typeof IncomingMessage, typeof ServerResponse> | undefined;

if (isHTTPS) {
	HTTPSServer = createHTTPSServer({
		key: readFileSync(path.resolve('cert', 'key.pem')),
		cert: readFileSync(path.resolve('cert', 'cert.pem'))
	}, app);
}

(isHTTPS ? HTTPSServer! : app).listen(server.port, server.host, async () => {
	logger.info(
		`Server started on ${successLog(server.port)} port and ${successLog(server.host)} host`,
	);
	await connect(`${configHelper.getDBOrigin()}/${db.name}`);
	logger.info(
		`DB started on ${successLog(db.port)} port and ${successLog(db.host)} host`,
	);
});

process.on("SIGINT", async () => {
	console.log(`Server close`);
	console.log(`Database close`);
	await disconnect();
	process.exit(0);
});
