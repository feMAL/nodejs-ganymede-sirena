import mongoose, { model } from 'mongoose'
import { Product } from './product.model'
import { SearchRequest } from '../controllers/searchRequest.model'

const status_options = [ 'received', 'processing', 'fulfilled', 'failed']

const Schema = mongoose.Schema

export interface SearchOrder extends mongoose.Document {
    id     : Number,
    data   : SearchRequest,
    status : String,
    result : Array<Product>
}

const Search_Order = new Schema({
    id     : { 
        type   : Number,
        unique : true
    },
    data   : {
        type   : Object,
        unique : true
    },
    status : {
        type     : String,
        default  : 'received',
        enum     : status_options,
        required : true
    },
    result: [ { type: Schema.Types.ObjectId, ref:'product' } ]
})

export default model<SearchOrder>('search_order', Search_Order)

