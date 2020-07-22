/** 
 *   Route for Products
 */
import { Router } from 'express';
import ProductController from '../controllers/product.controller';

const api: Router = Router();

/**
 *   End-Points for Product
 */
api.post('/product/search', ProductController.searchRequest);
api.get('/product/search-orders',ProductController.showAllOrders);
api.get('/product/search-order/:idorder',ProductController.showOrderById);
//api.get('/product/category/:idcategory',ProductController.showProductsByCategory);

export default api;