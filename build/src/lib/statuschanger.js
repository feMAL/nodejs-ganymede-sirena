"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusChanger = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
class StatusChanger {
    constructor(newStatus, order) {
        this.newStatus = newStatus;
        this.order = order;
    }
    statusChanger() {
        let function_status = false;
        const status_options = ['received', 'processing', 'fulfilled', 'failed'];
        const status = this.newStatus.trim().toLowerCase();
        if (status_options.indexOf(status)) {
            this.order.status = status;
            order_model_1.default.findByIdAndUpdate(this.order._id, this.order, (err, updated) => {
                if (err) {
                    return function_status;
                }
                if (updated) {
                    return function_status = true;
                }
            });
        }
        else {
            return function_status;
        }
    }
}
exports.StatusChanger = StatusChanger;
