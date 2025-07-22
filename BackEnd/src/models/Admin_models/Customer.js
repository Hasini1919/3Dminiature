import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    
   cid:String,
   name:String,
   address:String,
   phoneno:String,
   status:{type:String,default:"new"}, 
   age:{type:Number, default:-1},

});

const Customer = mongoose.model('Customer',customerSchema);
export default Customer;