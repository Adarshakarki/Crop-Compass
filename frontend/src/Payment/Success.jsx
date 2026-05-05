import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

function Success() {
  return (
    <div className="w-full h-screen bg-[#DBE3D5] flex items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[1000px] h-[70vh] bg-[#F5F7F2] rounded-3xl shadow-2xl overflow-hidden flex border border-white/40"
      >
        {/* Left Section - Image */}
        <div className="w-1/2 h-full hidden md:block p-8">
          <div className="w-full h-full border border-[#8FA189]/20 rounded-2xl overflow-hidden">
            <img 
              src="/receipt.jpg" 
              alt="Payment Successful" 
              className="w-full h-full object-cover grayscale-[10%]" 
            />
          </div>
        </div>

        {/* Right Section - Content */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-12 text-center bg-[#F5F7F2]">
          
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-[#8FA189] mb-6 border border-green-100 shadow-sm">
            <CheckCircle size={48} strokeWidth={1.5} />
          </div>

          <h1 
            className="text-5xl font-semibold text-[#3E4A3D] mb-4" 
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Payment <span className="italic text-[#8FA189]">Success.</span>
          </h1>

          {/* TWO LINE MESSAGE */}
          <p className="text-[#8FA189] text-[10px] uppercase font-black tracking-[0.3em] mb-10 max-w-[450px] leading-relaxed">
            Your payment was successfully processed.<br />
            Thank you for choosing our platform.
          </p>

          <div className="w-full max-w-xs">
            <Link to="/home" className="block w-full">
              <button className="w-full bg-[#3E4A3D] text-[#F5F7F2] py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest shadow-xl hover:bg-[#8FA189] transition-all">
                Back to Home
              </button>
            </Link>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

export default Success;