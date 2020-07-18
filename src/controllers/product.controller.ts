import { Request, Response } from 'express'
import Search_Order, { SearchOrder } from '../models/order.model'
import { StatusChanger } from '../lib/statuschanger'
import { SearchRequest } from './searchRequest.model'
import { Communicator }from '../lib/communicator'

/**
 *  Solicitud de Consulta 
 */

const searchRequest = async (req:Request, res:Response) => {
    if(!req.body){
        return res.status(400).send({ok:false, message:'No ha enviado los parametros requeridos'})
    }
    
    let params: SearchRequest = req.body

    if(!params.query || !params.providers || !params.callbackUrl){
        return res.status(400).send({ok:false, message:'No ha enviado los parametros requeridos'})
    }

    let newSearchOrder = new Search_Order()

    newSearchOrder.id = new Date().getTime()
    newSearchOrder.data = params

    newSearchOrder.save((err,orderSaved)=>{
        if(err){
            return res.status(500).send( { ok: false, message: err.message } )
        }
        if(!orderSaved){
            return res.status(404).send( { ok: false, message: 'No se ha encontrado la orden de busqueda generada'} )
        }else{
            let changer : SearchOrder = new StatusChanger('pending',orderSaved).statusChanger()
            console.log(changer)
            let connection = new Communicator()
                .sendCommunication(changer)
                .then( res => {
                    console.log(res)
                })
                .catch( err => console.log(err) )
            return res.status(200).send( { orderSaved } )
        }
    })
}

const showAllOrders = async (req:Request, res:Response) => {
    Search_Order.find().exec( ( err, allOrder ) => {
        if(err){
            return res.status(500).send( { ok: false, message: err.message } )
        }
        return res.status(200).send( { ok: true, search_order: allOrder } )
    })
}

const showOrderById = async (req:Request, res:Response) => {
    let idOrder: String = req.params.idorder
    if(idOrder){
        if(idOrder.length == 24){
            Search_Order.findById(idOrder,(err,foundIt)=>{
                if(err){
                    return res.status(500).send( { ok: false, message: err.message } )
                }
                return res.status(200).send( { ok: true, search_order: foundIt } )
            })
        }else{
            return res.status(400).send({ok:false, message:'No ha enviado los parametros requeridos correctamente'})
        }
    }else{
        return res.status(400).send({ok:false, message:'No ha enviado los parametros requeridos correctamente'})
    }
    
}

const showProductsByCategory = async (req:Request, res:Response) => {
    res.status(200).send({ok:true, message:'product/search endpoint UP!'})
}

export default {
    searchRequest,
    showAllOrders,
    showOrderById,
    showProductsByCategory
}