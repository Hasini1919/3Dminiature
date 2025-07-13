import mongoose from "mongoose";
const addressSchema = new mongoose.Schema({
  province: String,
  districts: [
    {
      name: String,
      cities: [String]
    }
  ]
});
const AddressModel=mongoose.models.AddressModel || mongoose.model("addresses",addressSchema);
 
  
export default AddressModel;