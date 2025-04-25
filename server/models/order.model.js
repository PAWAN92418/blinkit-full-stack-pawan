import mongoose from "mongoose";

const orderschema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    orderId: {
        type: String,
        require: [true, "provide ordreId "],
        unique: true
      },      
    productId:{
        type:mongoose.Schema.ObjectId,
        ref:"product"
    },
    product_detalis:{
        name:String,
        image:Array
    },
    qty: {
         type: Number,
          required: true 
    }, 
    paymentId:{
        type:String,
        default:""
    },
    payment_status:{
        type:String,
        default:""
    },
    delivery_address:{
        type:mongoose.Schema.ObjectId,
        ref:"address"
    },
    subTotalAmt:{
        type:Number,
        default:0
    },
    totalAmt:{
        type:Number,
        default:0
    },
    invoice_receipt:{
        type:String,
        default:0
    },

},{
    timestamps:true
})

const orderModel=mongoose.model('order',orderschema)

export default orderModel