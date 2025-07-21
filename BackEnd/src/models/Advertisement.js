import mongoose from "mongoose";

const advertisementSchema = new mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /\.(jpg|jpeg|png|webp)$/i.test(v);
        },
        message: (props) => `${props.value} is not a valid image file!`,
      },
    },
    title: { type: String, required: true },
    mainTitle: { type: String, required: true },
    price: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "AdvertisementDetails" }
);

export default mongoose.model("Advertisement", advertisementSchema);