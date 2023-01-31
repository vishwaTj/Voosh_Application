const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    dishName:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    description:{
       type:String,
       required:true
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
})

const Order = mongoose.model('Order',OrderSchema);
module.exports = Order;