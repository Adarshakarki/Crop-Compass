import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ArrowLeft } from "lucide-react";
import { useSetRecoilState } from 'recoil';
import { userRole } from '../store/atom';

const SellerSignup = () => {
  const navigate = useNavigate();
  const setUserRole = useSetRecoilState(userRole);
  const [formData, setFormData] = useState({ username: "", email: "", phone: "", password: "" });
  const [otp, setOtp] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setOtp("");
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendOtp = async () => {
    if (!formData.email) {
      toast.error("Please enter your email first.");
      return;
    }
    try {
      setSendingOtp(true);
      await axios.post("/api/v1/seller/send-otp", { email: formData.email });
      toast.success("OTP sent to your email.");
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to send OTP.");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.phone || !formData.password) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      if (!otp) {
        toast.error("Please enter the OTP sent to your email.");
        return;
      }

      const verifyRes = await axios.post("/api/v1/seller/verify-otp", {
        email: formData.email,
        otp,
      });

      if (!verifyRes.data?.success) {
        toast.error(verifyRes.data?.error || "Invalid OTP.");
        return;
      }

      const response = await axios.post("/api/v1/seller/register", formData);
      if (response.status === 201) {
        toast.success("Registration successful!");
        setUserRole(response.data.role);
        setTimeout(() => navigate("/dashboard"), 3000);
      }
    } catch (error) {
      toast.error("Registration failed!");
    }
  };

  return (
    <div className="w-full h-screen bg-[#dbe3d5] flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-6xl h-[85vh] bg-[#F5F7F2] rounded-3xl shadow-2xl flex overflow-hidden border border-white/50 relative">
        <button onClick={() => navigate(-1)} className="absolute top-8 left-8 flex items-center gap-2 text-[#8FA189] font-bold text-xs uppercase tracking-widest hover:text-[#3E4A3D] transition-colors z-20">
            <ArrowLeft size={16} /> Back
        </button>
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full pt-8">
            <h1 className="text-5xl font-semibold text-[#3E4A3D] mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Seller <span className="italic text-[#8FA189]">Signup</span></h1>
            <p className="text-[#8FA189] text-[9px] uppercase font-black tracking-[0.3em] mb-10">Start Selling with AI</p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input type="text" name="username" placeholder="Full Name" onChange={handleChange} className="w-full px-4 py-4 border border-[#8FA189]/20 rounded-xl" />
              <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full px-4 py-4 border border-[#8FA189]/20 rounded-xl" />
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-4 border border-[#8FA189]/20 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="px-4 py-4 rounded-xl bg-[#8FA189] text-white text-[10px] font-bold uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={sendingOtp || !formData.email}
                  >
                    {sendingOtp ? "Sending..." : "Send OTP"}
                  </button>
                </div>
              </div>
              <input type="tel" name="phone" placeholder="Phone" onChange={handleChange} className="w-full px-4 py-4 border border-[#8FA189]/20 rounded-xl" />
              <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full px-4 py-4 border border-[#8FA189]/20 rounded-xl" />
              <button
                type="submit"
                className="w-full bg-[#3E4A3D] text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#8FA189] transition-all"
              >
                Register
              </button>
            </form>
          </div>
        </div>
        <div className="hidden md:block w-1/2 p-8"><img src="/seller.jpg" className="w-full h-full object-cover rounded-2xl" alt="Signup" /></div>
      </motion.div>
      <ToastContainer />
    </div>
  );
};
export default SellerSignup;