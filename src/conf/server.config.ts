export const ServerConfig = {
    ganymede: {
        port    : 5000 || process.env.PORT,
        uriBase : '/api'
    },
    dbganymede: {
        port    : 27017,
        url     : 'localhost',
        protocol: 'mongodb',
        dbname  : 'sirena'

    }
}