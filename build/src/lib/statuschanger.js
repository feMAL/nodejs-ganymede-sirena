"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusChanger = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
/**
 *  @name StatusChanger
 *  @description Clase para cambiar el estado de la Orden de Busqueda
 *  @type Clase
 */
class StatusChanger {
    constructor(newStatus, order) {
        this.newStatus = newStatus;
        this.order = order;
    }
    /**
     *  @name statusChanger
     *  @description Función para cambiar el estado del Orden de Busqueda.
     *  @type funcion
     *  @returns Devuelve la orden modificada.
     */
    statusChanger() {
        var order = this.order;
        const status_options = ['received', 'processing', 'fulfilled', 'failed'];
        const status = this.newStatus.trim().toLowerCase();
        if (status_options.indexOf(status)) {
            order.status = status;
            order_model_1.default.findByIdAndUpdate(this.order._id, order, { new: true }, (err, updated) => {
                if (err) {
                    console.log(err.message);
                }
                order = updated || order;
            });
        }
        return order;
    }
}
exports.StatusChanger = StatusChanger;
