interface IConfigServer {
	host: string;
	port: number;
	protocol: string;
}
interface IConfigDB extends IConfigServer {
	name: string;
}
interface IConfigClient extends IConfigServer {}

interface IConfig {
	server: IConfigServer;
	clients: IConfigClient[];
	database: IConfigDB;
}

export type { IConfig, IConfigServer, IConfigDB, IConfigClient };
