
export interface ServerConfig {
    ganymede: {
        port    : Number | String | undefined
    },
    themisto    : {
        protocol: String,
        url     : String,
        port    : Number,
        uriBase : String
        uris    : {
            input  : String
        }
    },
    dbganymede: {
        protocol : String,
        port    ?: String | Number,
        url      : String | undefined,
        dbname   : String | undefined,
        username?: String | undefined,
        passwd  ?: String ,
    }
}
/**
 *  @name ServerConfigDev
 *  @description Objeto de configuración para servidores.
 *  @type Constante de tipo Object
 */
export const ServerConfigDev = {
    ganymede: {
        port    : 5000
    },

    /**
     *  Themisto Config
     */
    themisto    : {
        protocol: 'http',
        url     : 'localhost',
        port    : 5050,
        uriBase : '/api',
        uris    : {
            input  : '/engine-search/input'
        }
    },

    /**
     *  Data Base config
     */
    dbganymede: {
        protocol: 'mongodb',
        port    : 27017,
        url     : 'localhost',
        dbname  : 'sirena'
    }
}
/**
 *  @name ServerConfigProd
 *  @description Objeto de configuración para servidores.
 *  @type Constante de tipo Object
 */
export const ServerConfigProd: ServerConfig= {
    ganymede: {
        port    : process.env.PORT,
    },
    themisto    : {
        protocol: 'http',
        url     : 'localhost',
        port    : 5050,
        uriBase : '/api',
        uris    : {
            input  : '/engine-search/input'
        }
    },
    dbganymede: {
        protocol: 'mongodb+srv',
        url     : process.env.URL_MONGO_DB,
        dbname  : process.env.MONGO_DB,
        username: process.env.USER_MONGO_DB,
        passwd  : process.env.PASS_MONGO_DB,
    }
}