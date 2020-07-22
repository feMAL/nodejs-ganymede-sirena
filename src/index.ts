/**
 *   @name index  Entrada al aplicativo
 *   @description  Levanta API (GanyMede). Se configura los middlewares, y las rutas del servicio.
 *   @type API  -> Ganymede
 */ 

//Imports 
import express from 'express'
import mongoose from 'mongoose'
import { ServerConfig } from './conf/server.config'

//Routes
import ProductRoute  from './routes/product.route'
import InputRoute  from './routes/input.route'

//Initializations
const app      = express()
const PORT     = ServerConfig.ganymede.port 
const URI_BASE = ServerConfig.ganymede.uriBase
const dbData   = ServerConfig.dbganymede

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
app.use(URI_BASE, [ ProductRoute, InputRoute ] )

//Server API
app.listen( PORT, ( ) => {
    console.log(`# Server Listen on Port ${PORT}`)
    mongoose.Promise
    mongoose.connect(`${dbData.protocol}://${dbData.url}:${dbData.port}/${dbData.dbname}`,
        { 
            useUnifiedTopology: true,
            useNewUrlParser: true
        }).then( (connected) => {
            console.log('# DataBase Server MongoDB running..')
        }).catch( err => {
            console.log(err)
        })
})