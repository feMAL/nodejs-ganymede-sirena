import * as ServerConfig from '../conf/server.config'

export class Communicator {

    private themistoConfig = ServerConfig.ServerConfig.themisto
    private themistoURL = `${this.themistoConfig.protocol}://${this.themistoConfig.url}:${this.themistoConfig.port}/${this.themistoConfig.uriBase}`

    constructor() {}

    sendCommunication( data: JSON ){
        fetch(this.themistoURL,{
            method : 'POST',
            body   : JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            
            res.json()

        }).catch(err => {
            console.log(err.message)
        })
    }
}