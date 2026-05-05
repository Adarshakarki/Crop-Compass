import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Store, ArrowLeft } from "lucide-react";

const First = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  // Navigation Logic for Create Account
  const handleCreateAccount = () => {
    if (role === "buyer") {
      navigate("/Buyersignup");
    } else if (role === "seller") {
      navigate("/Sellersignup");
    }
  };


  const handleLogin = () => {
    if (role === "buyer") {
      navigate("/buyerlogin");
    } else if (role === "seller") {
      navigate("/loginseller");
    }
  };

  return (
    <div className="w-full h-screen bg-[#dbe3d5] flex items-center justify-center p-6 font-sans">
      
      <div className="w-full max-w-[1300px] h-[90vh] bg-[#F5F7F2] rounded-2xl shadow-2xl overflow-hidden flex border border-white/40">
        
        {/* LEFT SECTION */}
        <div className="w-1/2 h-full hidden md:block p-8 bg-[#F5F7F2]">
           <div className="w-full h-full border border-[#8FA189]/20 rounded-xl overflow-hidden shadow-sm">
              <img 
                src="/illustration.jpg" 
                alt="Agri Tech" 
                className="w-full h-full object-cover" 
              />
           </div>
        </div>

        {/* RIGHT SECTION: CONTENT */}
        <div className="w-full md:w-1/2 flex flex-col bg-[#F5F7F2]">
          
          {/* NAVBAR */}
          <div className="flex items-center justify-between px-10 py-8">
            <img src="/logo.png" alt="Logo" className="w-14 h-14 object-contain" />
            
            <nav className="flex space-x-3">
              {["About", "Features", "Contact"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="text-[#3E4A3D] text-[11px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-lg bg-[#8FA189]/10 hover:bg-[#8FA189] hover:text-white transition-all duration-300"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* MAIN BODY */}
          <div className="flex-1 px-16 flex flex-col justify-center">
            {!role ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="text-5xl font-bold text-[#3E4A3D] mb-4 leading-tight tracking-tight">
                  Smart Trade. <br /> Precision AI.
                </h1>
                <p className="text-base text-gray-500 mb-10 max-w-sm leading-relaxed">
                  AI-driven commerce powered by precision soil analytics and yield prediction.
                </p>

                <div className="space-y-4">
  {/* BUYER CARD */}
  <div 
    onClick={() => setRole("buyer")}
    className="cursor-pointer p-6 rounded-xl border border-[#8FA189]/20 bg-white shadow-sm hover:border-[#8FA189] hover:shadow-md transition-all flex items-center gap-5 group"
  >
    <div className="w-12 h-12 rounded-lg bg-[#8FA189]/10 flex items-center justify-center text-[#3E4A3D] group-hover:bg-[#8FA189] group-hover:text-white transition-colors">
      <ShoppingCart size={24} />
    </div>
    <div>
      <h3 className="font-bold text-[#3E4A3D] text-lg">Join as a Buyer</h3>
      <p className="text-[10px] text-[#8FA189] font-bold uppercase tracking-widest">Browse & Purchase Crops</p>
    </div>
  </div>

  {/* SELLER CARD */}
  <div 
    onClick={() => setRole("seller")}
    className="cursor-pointer p-6 rounded-xl border border-[#8FA189]/20 bg-white shadow-sm hover:border-[#8FA189] hover:shadow-md transition-all flex items-center gap-5 group"
  >
    <div className="w-12 h-12 rounded-lg bg-[#8FA189]/10 flex items-center justify-center text-[#3E4A3D] group-hover:bg-[#8FA189] group-hover:text-white transition-colors">
      <Store size={24} />
    </div>
    <div>
      <h3 className="font-bold text-[#3E4A3D] text-lg">Join as a Seller</h3>
      <p className="text-[10px] text-[#8FA189] font-bold uppercase tracking-widest">Sell Crops</p>
    </div>
  </div>
</div>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                 <button 
                  onClick={() => setRole(null)} 
                  className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8FA189] hover:text-[#3E4A3D] transition-colors"
                >
                  <ArrowLeft size={14} /> Back to Selection
                </button>
                <h2 className="text-4xl font-bold text-[#3E4A3D] mb-8 capitalize">Join as {role}</h2>
                
                <div className="space-y-4 max-w-sm">
                  {/* Updated with Navigation Handlers */}
                  <button 
                    onClick={handleCreateAccount}
                    className="w-full bg-[#8FA189] text-white py-4 rounded-xl font-bold hover:bg-[#7A8C74] transition-all shadow-lg shadow-[#8FA189]/20"
                  >
                    Create Account
                  </button>
                  <button 
                    onClick={handleLogin}
                    className="w-full border-2 border-[#8FA189] text-[#3E4A3D] py-4 rounded-xl font-bold hover:bg-[#8FA189] hover:text-white transition-all"
                  >
                    Login to Dashboard
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* FOOTER */}
          <div className="px-16 py-8">
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.4em]">
              Powered by CropCompass ML Intelligence
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default First;