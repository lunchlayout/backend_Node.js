import express from 'express'
import yaml from 'node-yaml-config'
import path from 'path'
import { IConfig } from './types/config'


const {server: {host, port}}: IConfig = yaml.load(path.resolve('config.yaml'))


const app = express();

app.listen(port, host, () => {
    console.log(`server started on ${port} port and ${host} host`)
})



