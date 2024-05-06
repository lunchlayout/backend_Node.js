import { IConfig } from "../types/config.js";
import yaml from 'node-yaml-config';


/**
 * @classdesc Управление конфигурацией
 * 
 * {@link https://github.com/liminfinity github by author}
 */
class ConfigHelper {
    private config: IConfig
	/**
	 * @constructor
	 * @param {string} link - Ссылка на конфигурацию
	 */
	constructor(link: string) {
        this.config = yaml.load(link);
    }
	/**
	 * Конфигурация сервера
	 */
	get server() {
        return this.config.server
    }
	/**
	 * Источник сервера
	 */
	getServerOrigin() {
		const {server: {host, port, protocol}} = this.config
		return `${protocol}://${host}:${port}`
	}
    /**
	 * Конфигурация базы данных
	 */
	get database() {
        return this.config.database
    }
	/**
	 * Источник базы данных
	 */
	getDBOrigin() {
		const {database: {host, port, protocol}} = this.config
		return `${protocol}://${host}:${port}`
	}
    /**
	 * Конфигурация клиентов
	 */
	get clients() {
        return this.config.clients
    }
	/**
	 * Источники клиентов
	 */
	getClientsOrigin() {
		return this.config.clients?.map(client => {
			return `${client.protocol}://${client.host}:${client.port}`
		}) ?? []
	}

}

export { ConfigHelper }
