
import { Router } from 'express';
import InputController from '../controllers/input.controller';

const api: Router = Router();

/**
 *   @description  Entrada del resultado generado por Themisto
 *   @type End-Point -> Ruta del API
 */ 
api.post('/input/search-result', InputController.getResult);

export default api;