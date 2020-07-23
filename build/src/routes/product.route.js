"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const api = express_1.Router();
/**
 *   @description  Entrada para la solicitud de busqueda
 *   @type End-Point -> Ruta del API
 */
api.post('/product/search', product_controller_1.default.searchRequest);
/**
 *   @description  Entrada para obtener todas las ordenes de busquedas generadas
 *   @type End-Point -> Ruta del API
 */
api.get('/product/search-orders', product_controller_1.default.showAllOrders);
/**
 *   @description  Entrada para obtener una orden de busqueda especifica.
 *   @type End-Point -> Ruta del API
 */
api.get('/product/search-order/:idorder', product_controller_1.default.showOrderById);
/**
 *   @description  Entrada para obtener todos los productos que contengan la categoria enviada por parametro
 *   @type End-Point -> Ruta del API
 */
api.get('/product/category/:idcategory', product_controller_1.default.showProductsByCategory); //Doesn't works
exports.default = api;
