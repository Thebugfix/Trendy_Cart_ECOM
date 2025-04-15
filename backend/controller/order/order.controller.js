const OrderModel = require("../../models/orderProductModel")

const orderController = async(req, res) => {
    try{
        const currentuserId = req.userId

        const orderList = await OrderModel.find({ userId: currentuserId }).sort({ createdAt: -1 })

        res.json({
            data: orderList,
            error: false,
            success: true,
            message: "Order list"
        })

    }catch(err){
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}
module.exports = orderController