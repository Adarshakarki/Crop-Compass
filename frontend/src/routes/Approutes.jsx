import { Route, Routes } from "react-router-dom";

import First from "../pages/First";
import BuyerSignup from "../pages/Buyersignup";
import Sellersignup from "../pages/Sellersignup";
import Loginasseller from "../pages/Loginasseller";
import BuyerLogin from "../pages/BuyerLogin";

import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Cart from "../pages/Cart";
import About from "../pages/About";
import Features from "../pages/Features";
import Help from "../pages/Help";
import Contact from "../pages/Contact";

// ML Pages (Import the new files you are creating)
import CropRecommendation from "../pages/CropRecommendation";
import FertilizerRecommendation from "../pages/FertilizerRecommendation";

import SellerDashboard from "../pages/Sellerdashboard";
import Orders from "../pages/Orders";
import MyOrders from "../pages/MyOrders";
import Addproduct from "../pages/Addproduct";
import Selleredititems from "../pages/Selleredititems";

import ProductDetails from "../pages/ProductDetails";

import Payment from "../Payment/Payment";
import Success from "../Payment/Success";
import Failure from "../Payment/Failure";


function Approutes() {
  return (
    <Routes>
      <Route path="/" element={<First />} />

      <Route path="/buyersignup" element={<BuyerSignup />} />
      <Route path="/sellersignup" element={<Sellersignup />} />
      <Route path="/loginseller" element={<Loginasseller />} />
      <Route path="/buyerlogin" element={<BuyerLogin />} />

      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/about" element={<About />} />
      <Route path="/features" element={<Features />} />
      <Route path="/help" element={<Help />} />
      <Route path="/contact" element={<Contact />} />

      
      <Route path="/crop-recommendation" element={<CropRecommendation />} />
      <Route path="/fertilizer-recommendation" element={<FertilizerRecommendation />} />

      
      <Route path="/dashboard" element={<SellerDashboard />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/myorders" element={<MyOrders />} />
      <Route path="/additem" element={<Addproduct />} />
      <Route path="/edit-item/:id" element={<Selleredititems />} />

      <Route path="/productdetails/:id" element={<ProductDetails />} />

      
      <Route path="/payment" element={<Payment />} />
      <Route path="/success" element={<Success />} />
      <Route path="/failure" element={<Failure />} />
    </Routes>
  );
}

export default Approutes;