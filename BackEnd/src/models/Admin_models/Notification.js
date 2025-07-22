import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    type : String,
    message: String,
    seen:{type:Boolean , default:false},
    createdAt: {type:Date , default: Date.now ,expires:"30d"}
});

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;