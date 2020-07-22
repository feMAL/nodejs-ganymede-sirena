import Search_Order, { SearchOrder } from '../models/order.model'

/**
 *  @name StatusChanger
 *  @description Clase para cambiar el estado de la Orden de Busqueda
 *  @type Clase
 */
export class StatusChanger{

    constructor(
        private newStatus : String,
        private order     : SearchOrder
    ){}
    
    /**
     *  @name statusChanger
     *  @description Función para cambiar el estado del Orden de Busqueda.
     *  @type funcion
     *  @returns Devuelve la orden modificada.
     */
    statusChanger(): SearchOrder {
        var order :SearchOrder = this.order
        const status_options = [ 'received', 'processing', 'fulfilled', 'failed']
        const status = this.newStatus.trim().toLowerCase()
        if(status_options.indexOf(status)){
            order.status = status
            Search_Order.findByIdAndUpdate(this.order._id, order, { new: true } ,( err, updated ) => {
                if(err){
                    console.log(err.message)
                }
                order = updated || order
            })
        }
        return order
    }
}