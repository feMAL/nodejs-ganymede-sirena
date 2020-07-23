import { ServerConfig, ServerConfigDev, ServerConfigProd } from '../conf/server.config';
import Search_Order, { SearchOrder } from '../models/order.model';
import axios from 'axios';


/**
 *  @name Communicator
 *  @description Clase para crear una conexion entre Ganymede y Themisto
 *  @type Clase
 */
export class Communicator {

    private env_config  : ServerConfig = ServerConfigDev;
    private config_themi               = this.env_config.themisto;
    private themistoURL : string       = `${this.config_themi.protocol}://${this.config_themi.url}:${this.config_themi.port}${this.config_themi.uriBase}${this.config_themi.uris.input}`;

    constructor() {
        let enviornment = process.env.NODE_ENV;
        if( enviornment == 'prod'){
            this.env_config   = ServerConfigProd;
            this.config_themi = this.env_config.themisto;
            this.themistoURL  = `${this.config_themi.protocol}://${this.config_themi.url}:${this.config_themi.port}${this.config_themi.uriBase}${this.config_themi.uris.input}`;
        }
    }
    
    /**
     *  @name sendCommunication
     *  @description Función para enviar la orden de busqueda al servidor Themisto.
     *  @type funcion
     *  @param data  Objeto json => Orden de busqueda
     */
    sendCommunication = async ( data: SearchOrder ) => {
          
        return await axios.post(this.themistoURL,data)
            .then(res=> res.data).catch(err => err)
    }
}