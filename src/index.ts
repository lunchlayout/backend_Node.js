import express from 'express'
import yaml from 'node-yaml-config'
import path from 'path'
import { IConfig } from './types/config'
import cors from 'cors'

const {server: {host, port}}: IConfig = yaml.load(path.resolve('config.yaml'))


const app = express();

app.use(express.json())
app.use(cors({
    origin: "*"
}))


app.listen(port, host, () => {
    console.log(`server started on ${port} port and ${host} host`)
})



