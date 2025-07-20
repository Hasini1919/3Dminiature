import mongoose from "mongoose";

const advertisementSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
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

    title: {
      type: String,
      required: true,
    },

    mainTitle: { type: String, required: true },
    discountPercentage: {
      type: Number,
      required: true,
      default: 10,
    },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    expiresAt: { type: Date, index: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "AdvertisementDetails" }
);

export default mongoose.model("Advertisement", advertisementSchema);