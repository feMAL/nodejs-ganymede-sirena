import mongoose, {Schema, model} from 'mongoose'

export interface Product extends mongoose.Document {
    sku           : String,
    name          : String,
    price         : Float32Array,
    originalPrice : Float32Array,
    category      : Array<String>,
    description   : String,
    image         : String,
    searchRelated : String
}

const productSchema = new Schema({
    sku          : { 
        type: String,
        unique: true, 
        required:true
    },
    name         : { 
        type: String, 
        required: true
    },
    price        : { 
        type: Float32Array,
        required: true 
    },
    originaPrice : { 
        type: Float32Array, 
    },
    category     : [ { 
        type: String,
        /*type: Schema.Types.ObjectId, 
        ref:'category',*/
        required: true
    } ],
    description  : { 
        type: String 
    },
    image        : { 
        type: String 
    },
    searchRelated: { 
        type: Number
    }
})

export default model('product', productSchema )
