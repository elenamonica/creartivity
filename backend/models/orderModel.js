import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  orderItems: [
    {
      name: { type: String, required: true },
      image: { type: String, required: true },
      qty: { type: Number, required: true },
      price: { type: Number, default: 0, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  itemsPrice: { type: Number, required: false },
  shippingPrice: { type: Number, required: false },
  taxPrice: { type: Number, required: false },
  totalPrice: { type: Number, required: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isPaid: { type: Boolean, default: false},
  paidAt: {
      type: Date
  },
  isDelivered: {type: Boolean, default: false},
  deliveryAt: {
      type: Date
  }
}, {timestamps: true});

const Order = mongoose.model('Order', orderSchema);
export default Order;
