import express from 'express'
import yaml from 'node-yaml-config'
import path from 'path'
import { IConfig } from './types/config'
import cors from 'cors'
import helmet from 'helmet'
import { success } from './lib/console.js'
import { mainRouter } from './routers/index.js'
import { connect, disconnect } from 'mongoose'
import { errorHandler } from './middlewares/errorHandler.js'

const {server, database: db}: IConfig = yaml.load(path.resolve('config.yaml'))


const app = express();


app.use('/assets', express.static(path.resolve('public')))

app.use(express.json())
app.use(cors({
    origin: "*"
}))
app.use(helmet())

app.use('/', mainRouter)

app.use(errorHandler)

app.listen(server.port, server.host, async () => {
    console.log(`Server started on ${success(server.port)} port and ${success(server.host)} host`)
    await connect(`mongodb://${db.host}:${db.port}/${db.name}`)
    console.log(`DB started on ${success(db.port)} port and ${success(db.host)} host`)
})

process.on('SIGINT', async () => {
    console.log(`Server close`)
    console.log(`Database close`)
    await disconnect();
    process.exit(0)
})



