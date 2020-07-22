"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *   Route for Products
 */
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const api = express_1.Router();
/**
 *   End-Points for Product
 */
api.post('/product/search', product_controller_1.default.searchRequest);
api.get('/product/search-orders', product_controller_1.default.showAllOrders);
api.get('/product/search-order/:idorder', product_controller_1.default.showOrderById);
//api.get('/product/category/:idcategory',ProductController.showProductsByCategory);
exports.default = api;
