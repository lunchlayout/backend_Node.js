interface IConfigServer {
    host: string
    port: number
}
interface IConfigDB {
    host: string
    port: number,
    name: string
}


interface IConfig {
    server: IConfigServer
    database: IConfigDB
}

export {IConfig}