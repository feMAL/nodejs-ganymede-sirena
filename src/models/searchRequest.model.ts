/**
 *  @name SearchRequest
 *  @description Interface para castear el objeto de solicitud
 *  @type interface
 */
export interface SearchRequest{
        query       : String,
        providers   : String,
        options     : Object,
        callbackUrl : String
}