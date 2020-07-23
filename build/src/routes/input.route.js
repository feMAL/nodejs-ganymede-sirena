"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const input_controller_1 = __importDefault(require("../controllers/input.controller"));
const api = express_1.Router();
/**
 *   @description  Entrada del resultado generado por Themisto
 *   @type End-Point -> Ruta del API
 */
api.post('/input/search-result', input_controller_1.default.getResult);
exports.default = api;
