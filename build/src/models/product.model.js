"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    sku: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Float32Array,
        required: true
    },
    originaPrice: {
        type: Float32Array,
    },
    category: [{
            type: String,
            /*type: Schema.Types.ObjectId,
            ref:'category',*/
            required: true
        }],
    description: {
        type: String
    },
    image: {
        type: String
    },
    searchRelated: {
        type: Number
    }
});
exports.default = mongoose_1.model('product', productSchema);
