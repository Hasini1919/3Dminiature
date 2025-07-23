import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});

const EnquiryModel = mongoose.model('Enquiry', enquirySchema);
export default EnquiryModel;



