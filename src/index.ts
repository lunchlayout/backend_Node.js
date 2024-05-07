import express from 'express'
import path from 'path'
import cors from 'cors'
import helmet from 'helmet'
import { success } from './lib/console.js'
import { mainRouter } from './routers/index.js'
import { connect, disconnect } from 'mongoose'
import { errorHandler } from './middlewares/errorHandler.js'
import { ConfigHelper } from './lib/configHelper.js'

const configHelper = new ConfigHelper(path.resolve('config.yaml'))

const {server, database: db, clients} = configHelper;

const app = express();

app.use('/assets', express.static(path.resolve('public')))

app.use(express.json())
app.use(cors({
    origin: clients.length ? configHelper.getClientsOrigin() : '*'
}))
app.use(helmet())

app.use('/', mainRouter)

app.use(errorHandler)

app.listen(server.port, server.host, async () => {
    console.log(`Server started on ${success(server.port)} port and ${success(server.host)} host`)
    await connect(`${configHelper.getDBOrigin()}/${db.name}`)
    console.log(`DB started on ${success(db.port)} port and ${success(db.host)} host`)
})

process.on('SIGINT', async () => {
    console.log(`Server close`)
    console.log(`Database close`)
    await disconnect();
    process.exit(0)
})



