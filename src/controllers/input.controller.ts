import { Request, Response } from 'express';
import axios from 'axios';
import Search_Order, { SearchOrder } from '../models/order.model';
import Product_Schema, { Product } from '../models/product.model';

/**
 * @name getResult
 * @description Funcion de entrada del End-Point. End-point dedicado a la entrada de la resolución de ejecución de Themisto.
 *  
 * @param req  Objeto Tipo Request
 * @param res  Objeto Tipo Response
 */

const getResult = async (req:Request, res:Response ) => {
    let result: SearchOrder = req.body

    if( result.result != null ){
        if( result.status != null && result.data.callbackUrl != null){
            res.status(200).send({ status: 'ok', message: 'Resultados Recibido' });
            await saveProductResult( result );
            saveSearchOrder( result );
        }else{
            res.status(400).send({status:false, object: 'No envió el objeto correctamente'});
        }
    }else{
        res.status(400).send({status:false, object: 'No envió la request correctamente'});
    } 
}

/**
 * @name sendResult
 * @description Función para fowardear el SearchOrder
 * 
 * @param urlToFoward Objeto String indica callbackUrl a fowardar
 * @param searchResult Objeto SearchOrder se envia en el body.
 */
const sendResult = ( urlToFoward: string, searchResult: SearchOrder ) => {
    axios.post( urlToFoward, searchResult ).catch((err)=>{
        console.log('No se envió');
    })
}

/**
 * @name saveSearchOrder
 * @description Función para guardar la Orden de Busqueda con su estado final y los Productos encontrados en la orden de busqueda.
 * 
 * @param orderToUpdate Objeto de tipo SearchOrder
 */
const saveSearchOrder = ( orderToUpdate: SearchOrder ) => {


    Product_Schema.find( { searchRelated: orderToUpdate._id } ).exec( ( err, foundIt ) => {
        if(err){
            return console.log(err.message);
        }
        if(foundIt){

            orderToUpdate.result = foundIt;
            
            Search_Order.findByIdAndUpdate( orderToUpdate._id, orderToUpdate , { new: true }, ( err, updated ) => {
                if(err){
                    return console.log(err.message);
                }
                if(updated){
                    console.log(updated)
                    sendResult( orderToUpdate.data.callbackUrl.toString(), updated );
                }
            });
        }
    });
}

/**
 * @name saveProductResult
 * @description Función que guarda uno a uno  los productos obtenidos desde Themisto asociandolo a la orden de Busqueda.
 * 
 * @param orderToUpdate Objeto de tipo SearchOrder
 */
const saveProductResult = async ( orderToUpdate: SearchOrder ) => {
    
    await orderToUpdate.result.forEach( async ( productRecived ) => {
 
        let product = new Product_Schema();

        if(typeof productRecived.price === 'string'){
            var precioTest: string = productRecived.price;
            precioTest = precioTest.trim();
            productRecived.price = Number(precioTest)
        }

        product.searchRelated = orderToUpdate._id;
        product.name          = productRecived.name;
        product.category      = productRecived.category.filter( el => el != '');
        product.images        = productRecived.images || [];
        product.description   = productRecived.description;
        product.sku           = productRecived.sku || 0;
        product.price         = productRecived.price;
        product.originalPrice = productRecived.originalPrice || null;
        
        await product.save( ( err, saveProduct ) => {
            if(err){
                return console.log( err.message + ':- error -' );
            }
            if(saveProduct)
            {
                saveProduct;
            }
        })
    });
}

export default {
    getResult
}