export const ServerConfig = {
    ganymede: {
        port    : 5000 || process.env.PORT,
        uriBase : '/api'
    },
    themisto    : {
        protocol: 'http',
        url     : 'localhost',
        port    : 5050,
        uriBase : '/api'
    },
    dbganymede: {
        protocol: 'mongodb',
        port    : 27017,
        url     : 'localhost',
        dbname  : 'sirena'

    }
}