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
