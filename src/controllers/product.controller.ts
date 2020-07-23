import { Request, Response } from 'express'
import Search_Order, { SearchOrder } from '../models/order.model'
import { StatusChanger } from '../lib/statuschanger'
import { SearchRequest } from '../models/searchRequest.model'
import { Communicator }from '../lib/communicator'

/**
 *  @name SearchRequest
 *  @description Función de END-POINT para capturar la Solicitud de Busqueda.
 * 
 *  @param req  Objeto Tipo Request
 *  @param res  Objeto Tipo Response
 * 
 *  @returns Retorna un objeto SearchOrder en estado pending. Y envia el objeto de busqueda hacia Themisto.
 */
const searchRequest = async (req:Request, res:Response) => {
    if(!req.body){
        return res.status(400).send( { _ok: false, message: 'No ha enviado los parametros requeridos' } );
    }
    
    let params: SearchRequest = req.body;

    if(!params.query || !params.providers || !params.callbackUrl){
        return res.status(400).send( { _ok: false, message: 'No ha enviado los parametros requeridos'});
    }

    let newSearchOrder = new Search_Order()

    newSearchOrder.id = new Date().getTime()
    newSearchOrder.data = params

    newSearchOrder.save((err,orderSaved)=>{
        if(err){
            return res.status(500).send( { _ok: false, message: err.message } );
        }
        if(!orderSaved){
            return res.status(404).send( { _ok: false, message: 'No se ha encontrado la orden de busqueda generada'} );
        }else{
            let changer : SearchOrder = new StatusChanger('pending',orderSaved).statusChanger();
            let connection = new Communicator()
                .sendCommunication(changer).then( response => {
                    return res.status(200).send( { _ok: true, orderSaved, message: response } );
                })
                .catch( err => {
                    return res.status(500).send( { _ok: false, message: 'Se ha producido un error en el proceso' } );
                } );
            
        }
    })
}

/**
 *  @name showAllOrders
 *  @description Función de END-POINT para obtener todas las ordenes de busqueda.
 * 
 *  @param req  Objeto Tipo Request
 *  @param res  Objeto Tipo Response
 * 
 *  @returns Retorna todas las Ordenes
 */
const showAllOrders = async (req:Request, res:Response) => {
    Search_Order.find().populate('result').exec( ( err, allOrder ) => {
        if(err){
            return res.status(500).send( { _ok: false, message: err.message } )
        }
        return res.status(200).send( { _ok: true, search_order: allOrder } )
    })
}

/**
 *  @name showOrderById
 *  @description Función de END-POINT para obtener una orden por ID.
 * 
 *  @param req  Objeto Tipo Request
 *  @param res  Objeto Tipo Response
 * 
 *  @returns Retorna la orden solicitada por parametro
 */
const showOrderById = async (req:Request, res:Response) => {
    let idOrder: String = req.params.idorder
    if(idOrder){
        if(idOrder.length == 24){
            Search_Order.findById(idOrder,(err,foundIt)=>{
                if(err){
                    return res.status(500).send( { _ok: false, message: err.message } )
                }
                return res.status(200).send( { _ok: true, search_order: foundIt } )
            })
        }else{
            return res.status(400).send({_ok:false, message:'No ha enviado los parametros requeridos correctamente'})
        }
    }else{
        return res.status(400).send({_ok:false, message:'No ha enviado los parametros requeridos correctamente'})
    }
    
}

/**
 *  @name showProductsByCategory
 *  @description Función de END-POINT para obtener todas las ordenes de busqueda.
 * 
 *  @param req  Objeto Tipo Request
 *  @param res  Objeto Tipo Response
 * 
 *  @returns Retorna todas las Ordenes
 */
const showProductsByCategory = async (req:Request, res:Response) => {
    res.status(200).send({_ok:true, message:'product/search endpoint UP!'})
}

export default {
    searchRequest,
    showAllOrders,
    showOrderById,
    showProductsByCategory
}