"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Product_Schema = new mongoose_1.Schema({
    sku: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    originalPrice: {
        type: Number,
    },
    category: [{
            type: String,
            required: true
        }],
    description: {
        type: String
    },
    image: {
        type: String
    },
    searchRelated: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'search_order',
        require: true
    }
});
exports.default = mongoose_1.model('product', Product_Schema);
