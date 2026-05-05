import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Microscope, ArrowLeft, Database, Map, Beaker } from "lucide-react";
import Footer from "../components/Footer";

const Features = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-[#dbe3d5] font-sans">
      {/* Navbar Removed */}

      <main className="flex-grow flex flex-col items-center pt-12 pb-16 px-6">
        
        {/* HERO SECTION */}
        <motion.div
          className="bg-[#F5F7F2] p-10 md:p-16 rounded-2xl shadow-2xl max-w-[1200px] w-full border border-white/50 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* BACK BUTTON */}
          <button 
            onClick={() => navigate(-1)} 
            className="group mb-12 flex items-center gap-2 text-[#8FA189] font-bold text-xs uppercase tracking-[0.2em] hover:text-[#3E4A3D] transition-colors relative z-10"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back
          </button>

          <div className="flex flex-col md:flex-row gap-16 items-center relative z-10">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-[#8FA189] font-bold mb-4">
                <span className="h-[2px] w-8 bg-[#8FA189]"></span>
                <span className="uppercase tracking-[0.3em] text-[10px]">Technical Ecosystem</span>
              </div>
              
              <h1 className="text-6xl font-semibold text-[#3E4A3D] mb-8 leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Precision Tools for <br /> 
                <span className="italic text-[#8FA189]">Nepalese Soil.</span>
              </h1>
              
              <p className="text-xl text-[#3E4A3D]/70 leading-relaxed max-w-xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Leveraging NARC-verified data models to transform traditional 
                farming into a data-driven enterprise.
              </p>
            </div>
            
            {/* IMAGE VISUAL - Fixed for 1080x1350 (4:5 Ratio) */}
            <div className="w-full md:w-1/3 aspect-[4/5] relative group">
              <div className="absolute inset-0 bg-[#8FA189]/10 blur-2xl rounded-2xl group-hover:bg-[#8FA189]/20 transition-all duration-700"></div>
              
              <div className="relative w-full h-full bg-white rounded-2xl border border-[#8FA189]/30 shadow-xl overflow-hidden p-2">
                <div className="w-full h-full rounded-xl overflow-hidden relative">
                  <img 
                    src="/features.jpg" 
                    alt="Precision Agriculture Nepal" 
                    className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105" 
                  />
                  {/* Status Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#3E4A3D]/80 backdrop-blur-md p-3 rounded-lg border border-white/10 flex justify-between items-center">
                    <span className="text-[9px] text-white font-mono uppercase tracking-widest">
                      NARC_DATA_SYNC
                    </span>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-[#8FA189] rounded-full animate-pulse"></div>
                      <div className="w-1 h-1 bg-[#8FA189] rounded-full animate-pulse delay-75"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* THE BENTO GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
            
            {/* 1. Shop */}
            <div className="group p-8 bg-white rounded-2xl border border-[#8FA189]/10 hover:border-[#8FA189] transition-all">
              <ShoppingCart className="text-[#8FA189] mb-6" size={24} />
              <h3 className="text-2xl font-bold text-[#3E4A3D] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Agri-Shop</h3>
              <p className="text-xs text-gray-500 font-sans leading-relaxed">Secure marketplace to buy and sell verified produce with ML quality scoring.</p>
            </div>

            {/* 2. Crop Rec */}
            <div className="group p-8 bg-white rounded-2xl border border-[#8FA189]/10 hover:border-[#8FA189] transition-all">
              <Microscope className="text-[#8FA189] mb-6" size={24} />
              <h3 className="text-2xl font-bold text-[#3E4A3D] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>AI Predictor</h3>
              <p className="text-xs text-gray-500 font-sans leading-relaxed">Enter parameters to get ML-driven crop suggestions for your specific land.</p>
            </div>

            {/* 3. Fertilizer */}
            <div className="group p-8 bg-white rounded-2xl border border-[#8FA189]/10 hover:border-[#8FA189] transition-all">
              <Beaker className="text-[#8FA189] mb-6" size={24} />
              <h3 className="text-2xl font-bold text-[#3E4A3D] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>NPK Calculator</h3>
              <p className="text-xs text-gray-500 font-sans leading-relaxed">Input Nitrogen, Phosphorus, and Potassium levels for exact dosage requirements.</p>
            </div>

            {/* 4. Soil Library */}
            <div className="group p-8 bg-white rounded-2xl border border-[#8FA189]/10 hover:border-[#8FA189] transition-all">
              <Database className="text-[#8FA189] mb-6" size={24} />
              <h3 className="text-2xl font-bold text-[#3E4A3D] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Soil Library</h3>
              <p className="text-xs text-gray-500 font-sans leading-relaxed">Comprehensive profiles covering Nepal's unique regional fertility maps.</p>
            </div>

          </div>
        </motion.div>

        {/* REGIONAL FOCUS STRIP */}
        <div className="max-w-[1200px] w-full mt-12 bg-[#3E4A3D] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between shadow-xl border border-white/10">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#8FA189]/20 rounded-full flex items-center justify-center">
                 <Map className="text-[#8FA189]" size={24} />
              </div>
              <div className="flex flex-col">
                <p className="text-[#F5F7F2] font-sans text-sm tracking-wide">
                  Localized intelligence for <span className="font-bold text-[#8FA189]">77 Districts of Nepal</span>
                </p>
                <p className="text-[#8FA189] text-[10px] uppercase tracking-widest font-bold">
                  Official Data Source: NARC (Nepal Agricultural Research Council)
                </p>
              </div>
           </div>
           
           <div className="mt-6 md:mt-0 flex items-center gap-8">
              <div className="flex flex-col items-end border-r border-[#8FA189]/30 pr-8">
                 <span className="text-[10px] text-[#8FA189] font-black uppercase tracking-widest italic">Data Integrity</span>
                 <span className="text-white text-xs font-mono">NARC_VERIFIED_2024</span>
              </div>
              <div className="flex flex-col items-end">
                 <span className="text-[10px] text-[#8FA189] font-black uppercase tracking-widest">Last Sync Date</span>
                 <span className="text-white text-xs font-mono uppercase">Oct 24, 2024</span>
              </div>
           </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Features;