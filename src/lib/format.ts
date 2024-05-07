import path from "path";
import { ConfigHelper } from "./configHelper.js";

function joinPaths(...paths: string[]) {
	return "/" + paths.join("/");
}

function doPathToModel(modelName: string) {
	const configHelper = new ConfigHelper(path.resolve("config.yaml"));
	return (
		configHelper.getServerOrigin() +
		joinPaths("assets", "models", modelName, "model.gltf")
	);
}

function doPathToImage(img: string) {
	const configHelper = new ConfigHelper(path.resolve("config.yaml"));
	return configHelper.getServerOrigin() + joinPaths("assets", "images", img);
}

export { doPathToModel, doPathToImage };
