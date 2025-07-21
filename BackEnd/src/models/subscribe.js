
import mongoose from 'mongoose';

const subscribeSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
  }
});

const SubscribeModel = mongoose.model('Subscribe', subscribeSchema);
export default SubscribeModel;
