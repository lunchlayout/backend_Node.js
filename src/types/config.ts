interface IConfigServer {
    host: string
    port: number
}
interface IConfigDB {
    host: string
    port: number,
    name: string
}


export interface IConfig {
    server: IConfigServer
    database: IConfigDB
}