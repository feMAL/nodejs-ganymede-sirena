"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const order_model_1 = __importDefault(require("../models/order.model"));
const product_model_1 = __importDefault(require("../models/product.model"));
/**
 * @name getResult
 * @description Funcion de entrada del End-Point. End-point dedicado a la entrada de la resolución de ejecución de Themisto.
 *
 * @param req  Objeto Tipo Request
 * @param res  Objeto Tipo Response
 */
const getResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result = req.body;
    if (result.result != null) {
        if (result.status != null && result.data.callbackUrl != null) {
            res.status(200).send({ status: 'ok', message: 'Resultados Recibido' });
            yield saveProductResult(result);
            saveSearchOrder(result);
        }
        else {
            res.status(400).send({ status: false, object: 'No envió el objeto correctamente' });
        }
    }
    else {
        res.status(400).send({ status: false, object: 'No envió la request correctamente' });
    }
});
/**
 * @name sendResult
 * @description Función para fowardear el SearchOrder
 *
 * @param urlToFoward Objeto String indica callbackUrl a fowardar
 * @param searchResult Objeto SearchOrder se envia en el body.
 */
const sendResult = (urlToFoward, searchResult) => {
    axios_1.default.post(urlToFoward, searchResult).catch((err) => {
        console.log('No se envió');
    });
};
/**
 * @name saveSearchOrder
 * @description Función para guardar la Orden de Busqueda con su estado final y los Productos encontrados en la orden de busqueda.
 *
 * @param orderToUpdate Objeto de tipo SearchOrder
 */
const saveSearchOrder = (orderToUpdate) => {
    product_model_1.default.find({ searchRelated: orderToUpdate._id }).exec((err, foundIt) => {
        if (err) {
            return console.log(err.message);
        }
        if (foundIt) {
            orderToUpdate.result = foundIt;
            order_model_1.default.findByIdAndUpdate(orderToUpdate._id, orderToUpdate, { new: true }, (err, updated) => {
                if (err) {
                    return console.log(err.message);
                }
                if (updated) {
                    sendResult(orderToUpdate.data.callbackUrl.toString(), updated);
                }
            });
        }
    });
};
/**
 * @name saveProductResult
 * @description Función que guarda uno a uno  los productos obtenidos desde Themisto asociandolo a la orden de Busqueda.
 *
 * @param orderToUpdate Objeto de tipo SearchOrder
 */
const saveProductResult = (orderToUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    yield orderToUpdate.result.forEach((productRecived) => __awaiter(void 0, void 0, void 0, function* () {
        let product = new product_model_1.default();
        product.searchRelated = orderToUpdate._id;
        product.name = productRecived.name;
        product.category = productRecived.category.filter(el => el != '');
        product.images = productRecived.images || [];
        product.description = productRecived.description;
        product.sku = productRecived.sku || 0;
        product.price = productRecived.price;
        product.originalPrice = productRecived.originalPrice || null;
        yield product.save((err, saveProduct) => {
            if (err) {
                return console.log(err.message + ':- error -');
            }
            if (saveProduct) {
                saveProduct;
            }
        });
    }));
});
exports.default = {
    getResult
};
