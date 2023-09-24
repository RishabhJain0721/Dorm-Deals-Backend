import mongoose from "mongoose";

const sellingSchema = new mongoose.Schema({
  userEmail: String,
  itemName: String,
  itemDescription: String,
  contactNumber: Number,
  pickupLocation: String,
  images: Array,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ItemToSell = mongoose.model("ItemToSell", sellingSchema);

export default ItemToSell;
