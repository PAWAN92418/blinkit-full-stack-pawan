import Razorpay from 'razorpay';
// import Stripe from 'stripe';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import orderModel from '../models/order.model.js';
import UserModel from '../models/user.models.js';
import CartProductModel from '../models/cartproduct.model.js';
dotenv.config();


// ─── Cash On Delivery ───────────────────────────────────────────────────────────

export const CashOnDeliveryController = async (req, res) => {
  try {
    const userId = req.userId;
    const { list_items, totalAmount, addressId, subTotalAmt } = req.body;

    if (!Array.isArray(list_items) || !list_items.length) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }
    if (!addressId) {
      return res.status(400).json({ success: false, message: "Address required" });
    }

    // Build orders
    const ordersPayload = list_items.map(item => ({
      userId,
      orderId: uuidv4(),
      productId: item.productId._id,
      product_detalis: {
        name: item.productId.name,
        image: item.productId.image,
      },
      qty: item.quantity,
      delivery_address: addressId,
      subTotalAmt,
      totalAmt: totalAmount,
      payment_status: "Pending",
      paymentId: "",
      invoice_receipt: `INV-${Date.now()}`,
    }));

    // Insert orders
    const createdOrders = await orderModel.insertMany(ordersPayload);

    // Clear cart
    await CartProductModel.deleteMany({ userId });
    await UserModel.updateOne({ _id: userId }, { $set: { shopping_cart: [] } });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully (COD)",
      data: createdOrders,
    });
  } catch (err) {
    console.error("COD error:", err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ─── Get User Orders ────────────────────────────────────────────────────────────

export const getUserOrdersController = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await orderModel.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    console.error("Fetch orders error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};


// ─── Stripe Checkout Integration ────────────────────────────────────────────────
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

export const createStripeSession = async (req, res) => {
  const { cartItems, totalAmount, addressId } = req.body;

  if (!Array.isArray(cartItems) || !cartItems.length) {
    return res.status(400).json({ success: false, message: 'Cart is empty' });
  }
  if (!addressId) {
    return res.status(400).json({ success: false, message: 'Address required' });
  }

  try {
    const lineItems = cartItems.map(item => {
      if (isNaN(item.price) || isNaN(item.qty)) {
        throw new Error('Invalid price or quantity for cart item');
      }
    
      return {
        price_data: {
          currency: 'inr',
          product_data: { name: item.name },
          unit_amount: item.price * 100,  // Ensure it's a number
        },
        quantity: item.qty,
      };
    });
    

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({ success: true, url: session.url });
  } catch (err) {
    console.error('Stripe session creation error:', err);
    res.status(500).json({ success: false, message: 'Stripe session creation failed', error: err.message });
  }
};

