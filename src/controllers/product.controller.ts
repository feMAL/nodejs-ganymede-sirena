import { Request, Response } from 'express'

const searchRequest = async (req:Request, res:Response) => {
    res.status(200).send({ok:true, message:'product/search endpoint UP!'})
}

const showAllOrders = async (req:Request, res:Response) => {
    res.status(200).send({ok:true, message:'product/search endpoint UP!'})
}

const showOrderById = async (req:Request, res:Response) => {
    res.status(200).send({ok:true, message:'product/search endpoint UP!'})
}

const showProductsByCategory = async (req:Request, res:Response) => {
    res.status(200).send({ok:true, message:'product/search endpoint UP!'})
}

export default {
    searchRequest,
    showAllOrders,
    showOrderById,
    showProductsByCategory
}