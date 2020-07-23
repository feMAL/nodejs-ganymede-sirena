
import { Router } from 'express';
import ProductController from '../controllers/product.controller';

const api: Router = Router();

/**
 *   @description  Entrada para la solicitud de busqueda
 *   @type End-Point -> Ruta del API
 */ 
api.post('/product/search', ProductController.searchRequest);

/**
 *   @description  Entrada para obtener todas las ordenes de busquedas generadas
 *   @type End-Point -> Ruta del API
 */ 
api.get('/product/search-orders',ProductController.showAllOrders);

/**
 *   @description  Entrada para obtener una orden de busqueda especifica.
 *   @type End-Point -> Ruta del API
 */ 
api.get('/product/search-order/:idorder',ProductController.showOrderById);

/**
 *   @description  Entrada para obtener todos los productos que contengan la categoria enviada por parametro
 *   @type End-Point -> Ruta del API
 */ 
api.get('/product/category/:idcategory',ProductController.showProductsByCategory); //Doesn't works

export default api;