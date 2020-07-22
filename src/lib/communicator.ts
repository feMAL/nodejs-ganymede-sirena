import * as ServerConfig from '../conf/server.config'
import Search_Order, { SearchOrder } from '../models/order.model'
import axios from 'axios'

export class Communicator {

    private themistoConfig = ServerConfig.ServerConfig.themisto
    private themistoURL = `${this.themistoConfig.protocol}://${this.themistoConfig.url}:${this.themistoConfig.port}${this.themistoConfig.uriBase}${this.themistoConfig.uris.input}`

    constructor() {}

    sendCommunication = async ( data: SearchOrder ) => {
        let response = await axios.post(this.themistoURL,data);
        return response.data
    }
}