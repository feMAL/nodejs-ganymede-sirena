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
const order_model_1 = __importDefault(require("../models/order.model"));
const statuschanger_1 = require("../lib/statuschanger");
const communicator_1 = require("../lib/communicator");
/**
 *  @name SearchRequest
 *  @description Función de END-POINT para capturar la Solicitud de Busqueda.
 *
 *  @param req  Objeto Tipo Request
 *  @param res  Objeto Tipo Response
 *
 *  @returns Retorna un objeto SearchOrder en estado pending. Y envia el objeto de busqueda hacia Themisto.
 */
const searchRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        return res.status(400).send({ _ok: false, message: 'No ha enviado los parametros requeridos' });
    }
    let params = req.body;
    if (!params.query || !params.providers || !params.callbackUrl) {
        return res.status(400).send({ _ok: false, message: 'No ha enviado los parametros requeridos' });
    }
    let newSearchOrder = new order_model_1.default();
    newSearchOrder.id = new Date().getTime();
    newSearchOrder.data = params;
    newSearchOrder.save((err, orderSaved) => {
        if (err) {
            return res.status(500).send({ _ok: false, message: err.message });
        }
        if (!orderSaved) {
            return res.status(404).send({ _ok: false, message: 'No se ha encontrado la orden de busqueda generada' });
        }
        else {
            let changer = new statuschanger_1.StatusChanger('pending', orderSaved).statusChanger();
            let connection = new communicator_1.Communicator()
                .sendCommunication(changer).then(response => {
                return res.status(200).send({ _ok: true, orderSaved, message: response });
            })
                .catch(err => {
                return res.status(500).send({ _ok: false, message: 'Se ha producido un error en el proceso' });
            });
        }
    });
});
/**
 *  @name showAllOrders
 *  @description Función de END-POINT para obtener todas las ordenes de busqueda.
 *
 *  @param req  Objeto Tipo Request
 *  @param res  Objeto Tipo Response
 *
 *  @returns Retorna todas las Ordenes
 */
const showAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    order_model_1.default.find().populate('result').exec((err, allOrder) => {
        if (err) {
            return res.status(500).send({ _ok: false, message: err.message });
        }
        return res.status(200).send({ _ok: true, search_order: allOrder });
    });
});
/**
 *  @name showOrderById
 *  @description Función de END-POINT para obtener una orden por ID.
 *
 *  @param req  Objeto Tipo Request
 *  @param res  Objeto Tipo Response
 *
 *  @returns Retorna la orden solicitada por parametro
 */
const showOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let idOrder = req.params.idorder;
    if (idOrder) {
        if (idOrder.length == 24) {
            order_model_1.default.findById(idOrder, (err, foundIt) => {
                if (err) {
                    return res.status(500).send({ _ok: false, message: err.message });
                }
                return res.status(200).send({ _ok: true, search_order: foundIt });
            });
        }
        else {
            return res.status(400).send({ _ok: false, message: 'No ha enviado los parametros requeridos correctamente' });
        }
    }
    else {
        return res.status(400).send({ _ok: false, message: 'No ha enviado los parametros requeridos correctamente' });
    }
});
/**
 *  @name showProductsByCategory
 *  @description Función de END-POINT para obtener todas las ordenes de busqueda.
 *
 *  @param req  Objeto Tipo Request
 *  @param res  Objeto Tipo Response
 *
 *  @returns Retorna todas las Ordenes
 */
const showProductsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send({ _ok: true, message: 'product/search endpoint UP!' });
});
exports.default = {
    searchRequest,
    showAllOrders,
    showOrderById,
    showProductsByCategory
};
