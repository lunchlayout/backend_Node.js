interface IConfigServer {
    port: number,
    host: string
}


export interface IConfig {
    server: IConfigServer
}