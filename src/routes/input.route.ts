/** 
 *   Route for Products
 */
import { Router } from 'express';
import InputController from '../controllers/input.controller';

const api: Router = Router();

/**
 *   End-Points for Product
 */
api.post('/input/search-result', InputController.getResult);

export default api;