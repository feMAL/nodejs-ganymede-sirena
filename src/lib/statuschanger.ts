import Search_Order, { SearchOrder } from '../models/order.model'

export class StatusChanger{

    constructor(
        private newStatus : String,
        private order     : SearchOrder
    ){}

    statusChanger(){
        let function_status = false
        const status_options = [ 'received', 'processing', 'fulfilled', 'failed']
        const status = this.newStatus.trim().toLowerCase()
        if(status_options.indexOf(status)){
            this.order.status = status
            Search_Order.findByIdAndUpdate(this.order._id, this.order, ( err, updated ) => {
                if(err){
                    return function_status
                }
                if(updated){
                    return function_status = true
                }
            })
        }else{
            return function_status
        }
    }
}