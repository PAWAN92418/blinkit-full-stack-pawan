import mongoose from "mongoose";

const addressSchema =new mongoose.Schema({
    address_line:{
        type:String,
        default:""
    },
    city:{
        type:String,
        default:""
    },
    state:{
        type:String,
        default:""
    },
    pincode:{
        type:String,
    },
    mobile:{
        type:Number,
        default:""
    },
    status:{
        type:Boolean,
        default:true
    },user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",    
      },
    
},{
    timestamps:true
})

const AddressModel = mongoose.model("address" ,addressSchema)

export default AddressModel