import * as ServerConfig from '../conf/server.config';
import Search_Order, { SearchOrder } from '../models/order.model';
import axios from 'axios';


/**
 *  @name Communicator
 *  @description Clase para crear una conexion entre Ganymede y Themisto
 *  @type Clase
 */
export class Communicator {

    private themistoConfig = ServerConfig.ServerConfig.themisto
    private themistoURL = `${this.themistoConfig.protocol}://${this.themistoConfig.url}:${this.themistoConfig.port}${this.themistoConfig.uriBase}${this.themistoConfig.uris.input}`

    constructor() {}
    
    /**
     *  @name sendCommunication
     *  @description Función para enviar la orden de busqueda al servidor Themisto.
     *  @type funcion
     *  @param data  Objeto json => Orden de busqueda
     */
    sendCommunication = async ( data: SearchOrder ) => {
        let response = await axios.post(this.themistoURL,data)
        return response.data
    }
}