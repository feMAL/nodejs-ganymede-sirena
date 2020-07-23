/**
 *   @name index  Entrada al aplicativo
 *   @description  Levanta API (GanyMede). Se configura los middlewares, y las rutas del servicio.
 *   @type API  -> Ganymede
 */ 

//Imports 
import express from 'express'
import mongoose from 'mongoose'
import { ServerConfigDev, ServerConfigProd, ServerConfig } from './conf/server.config'

//Routes
import ProductRoute  from './routes/product.route'
import InputRoute  from './routes/input.route'

//Initializations
const app      = express();
let serverConf : ServerConfig = ServerConfigDev
const ENV      = process.env.NODE_ENV;
let PORT       = serverConf.ganymede.port;

let dbData     = serverConf.dbganymede;
let urlDB      = `${dbData.url}:${dbData.port}`
if( ENV == 'production'){
    serverConf = ServerConfigProd
    urlDB      = `${dbData.username}:${dbData.passwd}@${dbData.url}`
    PORT       = serverConf.ganymede.port
    console.log('productivo')
}

//MiddleWares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With,Content-Type,Accept, Access-Control-Allow-Request-Method')
    res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS')
    res.header('Allow','GET,POST,PUT,DELETE,OPTIONS')

    next();
})
app.use('/api', [ ProductRoute, InputRoute ] )

//Server API
app.listen( PORT, ( ) => {
    console.log(`# Server Listen on Port ${PORT}`)
    mongoose.Promise
    mongoose.connect(`${dbData.protocol}://${urlDB}/${dbData.dbname}`,
        { 
            useUnifiedTopology: true,
            useNewUrlParser: true
        }).then( (connected) => {
            console.log('# DataBase Server MongoDB running..')
        }).catch( err => {
            console.log(err)
        })
})