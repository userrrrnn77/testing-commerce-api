import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    size: {
      type: [String],
      enum: ["S", "M", "L", "XL", "XXL"],
      default: ["S", "M", "L", "XL", "XXL"],
    },
    productImage: {
      type: [String],
      validate: [
        (val) => val.length >= 1 && val.length <= 4,
        "Min 1, Maks 4 Image",
      ],
    },
    categoryProduct: { type: String, required: true },
    materialProduct: { type: String, required: true },
  },
  { timestamps: true }
);

const Products = mongoose.model("Products", productSchema);

export default Products;