import jwt from "jsonwebtoken";

import bcryptjs from "bcryptjs";
import { Product } from "../models/product.model.js";
import Buyer from "../models/buyer.model.js";
import Order from "../models/orders.model.js";
import { sendMail } from "../utils/mailer.js";

const OTP_EXP_MINUTES = 10;
const buyerOtpStore = new Map();

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const sendBuyerOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const otp = generateOtp();
    const expiresAt = Date.now() + OTP_EXP_MINUTES * 60 * 1000;

    buyerOtpStore.set(email, { otp, expiresAt, verified: false });

    const mailResult = await sendMail({
      to: email,
      subject: "Your email verification OTP",
      text: `Your verification code is ${otp}. It will expire in ${OTP_EXP_MINUTES} minutes.`,
    });

    if (mailResult?.skipped) {
      console.error("OTP email not sent:", mailResult);
      return res
        .status(500)
        .json({ error: "Email service is not configured on server" });
    }

    return res
      .status(200)
      .json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ error: "Failed to send OTP" });
  }
};

export const verifyBuyerOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res
        .status(400)
        .json({ error: "Email and OTP are required for verification" });
    }

    const record = buyerOtpStore.get(email);

    if (!record) {
      return res.status(400).json({ error: "No OTP found for this email" });
    }

    if (Date.now() > record.expiresAt) {
      buyerOtpStore.delete(email);
      return res.status(400).json({ error: "OTP has expired" });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    buyerOtpStore.set(email, {
      verified: true,
      expiresAt: Date.now() + OTP_EXP_MINUTES * 60 * 1000,
    });

    return res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ error: "Failed to verify OTP" });
  }
};

export const handlesignup = async (req, res) => {
    try {
      const role = "buyer";
      const { username, email, password, phone ,deliveryLocation} = req.body;
      console.log(req.body);
  
      const otpRecord = buyerOtpStore.get(email);
      if (
        !otpRecord ||
        !otpRecord.verified ||
        (otpRecord.expiresAt && Date.now() > otpRecord.expiresAt)
      ) {
        return res.status(400).json({
          error: "Please verify your email with OTP before signup",
        });
      }

      // Check if Buyer with the same email already exists
      const match = await Buyer.findOne({ email });
      if (match) {
        return res.status(400).json({ error: "Email already exists" });
      }
  
      // Hash the password
      const hashedPassword = await bcryptjs.hash(password, 10);
      console.log("Register");
  
      // Create a new user
      const newuser = await Buyer.create({
        username,
        email,
        password: hashedPassword,
        phone,
        role,
        deliverylocation:deliveryLocation,
      });
  
      // Generate a JWT token
      const token = jwt.sign({ _id: newuser._id }, process.env.JWT_SECRET);
  
      // Send the token in the response as a cookie
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // For production, use HTTPS
        })
        .status(200)
        .json({ success: true, message: "User created successfully" });

      buyerOtpStore.delete(email);
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ error: "Failed to register" });
    }
  };
  export const handlebuyerlogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user by email
      const user = await Buyer.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
  
      // Compare the provided password with the hashed password in the database
      const isMatch = await bcryptjs.compare(password, user.password); // Use 'await'
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  
      // Send the token in a cookie and a success response
      res
        .cookie("token", token, { httpOnly: true })
        .status(200)
        .json({ success: true, message: "Login successful" });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Failed to login" });
    }
  };
  export const buyerallitems = async (req, res) => {
    
  };
  
  export const profile = async (req, res) => {
    res.status(200).send({ success: true, message: req.user})
  }
  export const productdetails = async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ product });
    } catch (error) {
      console.error("Error fetching product details:", error);
      res.status(500).json({ message: "Failed to fetch product details" });
    }
  }


  const buildItemLines = (items) =>
    items
      .map((item) => {
        const name = item.product?.name || "Unknown product";
        const qty = item.quantity || 0;
        const price = item.price || 0;
        return `- ${name} x${qty} @ ${price}`;
      })
      .join("\n");

  const sendOrderEmails = async (orderId) => {
    try {
      const populatedOrder = await Order.findById(orderId)
        .populate("buyer", "username email phone deliverylocation")
        .populate("items.product", "name price")
        .populate("items.seller", "username email phone");

      if (!populatedOrder) {
        return;
      }

      const buyer = populatedOrder.buyer;
      const orderDate = new Date(populatedOrder.orderedAt).toLocaleString();
      const buyerItemsText = buildItemLines(populatedOrder.items);

      if (buyer?.email) {
        const buyerText = [
          `Hello ${buyer.username || "Buyer"},`,
          "",
          `Your order ${populatedOrder._id} has been placed successfully.`,
          `Order date: ${orderDate}`,
          "",
          "Items:",
          buyerItemsText,
          "",
          `Total amount: ${populatedOrder.totalAmount}`,
          `Payment method: ${populatedOrder.paymentMethod}`,
          "",
          "Thank you for shopping with us.",
        ].join("\n");

        await sendMail({
          to: buyer.email,
          subject: "Order confirmation",
          text: buyerText,
        });
      }

      const sellerItemsMap = populatedOrder.items.reduce((acc, item) => {
        const sellerId = item.seller?._id?.toString();
        if (!sellerId) {
          return acc;
        }
        if (!acc[sellerId]) {
          acc[sellerId] = { seller: item.seller, items: [] };
        }
        acc[sellerId].items.push(item);
        return acc;
      }, {});

      const sellerEmails = Object.values(sellerItemsMap).map(
        async ({ seller, items }) => {
          if (!seller?.email) {
            return;
          }

          const sellerItemsText = buildItemLines(items);
          const sellerTotal = items.reduce(
            (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
            0
          );

          const sellerText = [
            `Hello ${seller.username || "Seller"},`,
            "",
            `You have received a new order ${populatedOrder._id}.`,
            `Order date: ${orderDate}`,
            "",
            "Items:",
            sellerItemsText,
            "",
            `Subtotal: ${sellerTotal}`,
            `Payment method: ${populatedOrder.paymentMethod}`,
            "",
            "Buyer details:",
            `Name: ${buyer?.username || "N/A"}`,
            `Email: ${buyer?.email || "N/A"}`,
            `Phone: ${buyer?.phone || "N/A"}`,
            `Delivery location: ${buyer?.deliverylocation || "N/A"}`,
          ].join("\n");

          await sendMail({
            to: seller.email,
            subject: "New order received",
            text: sellerText,
          });
        }
      );

      await Promise.all(sellerEmails);
    } catch (error) {
      console.error("Order email sending failed:", error);
    }
  };

  export const orderhandeler = async (req, res) => {
    try {
      const buyer = req.user._id;
      const { items, totalAmount, paymentMethod } = req.body;
  
      // Basic input validation
      if (!buyer || !items || !Array.isArray(items) || items.length === 0 || !totalAmount) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      // Fetch product data and build full items array
      const fullItems = await Promise.all(
        items.map(async (item, index) => {
          const productData = await Product.findById(item.product);
  
          if (!productData) {
            throw new Error(`Product with ID ${item.product} not found (item index: ${index})`);
          }
  
          if (!productData.seller) {
            throw new Error(`Seller not found for product ID ${item.product} (item index: ${index})`);
          }
  
          return {
            product: item.product,
            quantity: item.quantity,
            price: item.price,
            seller: productData.seller, // ensure this is populated in your Product model!
          };
        })
      );
  
      // Create the order
      const order = await Order.create({
        buyer,
        items: fullItems,
        totalAmount,
        paymentMethod: paymentMethod || "Esewa",
      });
  
      res.status(201).json({
        success: true,
        message: "Order placed successfully",
        order,
      });

      await sendOrderEmails(order._id);
  
    } catch (error) {
      console.error("Order creation failed:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  };
  
export const getMyOrders = async (req, res) => {
  try {
    const buyerId = req.user._id;
    const orders = await Order.find({ buyer: buyerId })
      .populate('items.product')
      .populate('items.seller');

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching buyer's orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const buyerId = req.user._id;
    const { orderId } = req.params;

    const order = await Order.findOne({ _id: orderId, buyer: buyerId });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.orderStatus === "Cancelled") {
      return res.status(400).json({ success: false, message: "Order is already cancelled" });
    }

    if (order.orderStatus !== "Pending") {
      return res.status(400).json({ success: false, message: "Only pending orders can be cancelled" });
    }

    order.orderStatus = "Cancelled";
    await order.save();

    res.status(200).json({ success: true, message: "Order cancelled successfully", order });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({ success: false, message: "Failed to cancel order" });
  }
};