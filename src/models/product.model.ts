import mongoose, {Schema, model} from 'mongoose'

export interface Product extends mongoose.Document {
    sku           : String,
    name          : String,
    price         : Number,
    originalPrice : Number,
    category      : Array<String>,
    description   : String,
    images        : String,
    searchRelated : String
}

const Product_Schema = new Schema({
    sku          : { 
        type: String,
        required:true
    },
    name         : { 
        type: String, 
        required: true
    },
    price        : { 
        type: Number,
        required: true 
    },
    originalPrice : { 
        type: Number, 
    },
    category     : [ { 
        type: String,
        required: true
    } ],
    description  : { 
        type: String 
    },
    image        : { 
        type: String 
    },
    searchRelated: { 
        type: Schema.Types.ObjectId, ref:'search_order',
        require: true
    }
})

export default model<Product>('product', Product_Schema )
