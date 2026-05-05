import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  Globe, 
  Facebook, 
  Instagram, 
  Youtube,
  MessageSquare
} from "lucide-react";
import Footer from "../components/Footer";

const Contact = () => {
  const navigate = useNavigate();

  // Animation variants for the staggered cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#dbe3d5] font-sans">
      <main className="flex-grow flex flex-col items-center pt-12 pb-16 px-6">
        
        <motion.div
          className="bg-[#F5F7F2] p-10 md:p-16 rounded-3xl shadow-2xl max-w-[1200px] w-full border border-white relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* BACK BUTTON */}
          <button 
            onClick={() => navigate(-1)} 
            className="group mb-12 flex items-center gap-2 text-[#8FA189] font-bold text-xs uppercase tracking-[0.2em] hover:text-[#3E4A3D] transition-colors relative z-10"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back
          </button>

          <div className="flex flex-col md:flex-row gap-16 items-start relative z-10">
            
            {/* LEFT SECTION: CONTENT & CHANNELS */}
            <motion.div 
              className="flex-1 pt-4 order-2 md:order-1"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center gap-2 text-[#8FA189] font-bold mb-6">
                <span className="h-[2px] w-8 bg-[#8FA189]"></span>
                <span className="uppercase tracking-[0.3em] text-[10px]">Direct Inquiry</span>
              </div>
              
              <h1 className="text-6xl font-semibold text-[#3E4A3D] mb-8 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Get in <span className="italic text-[#8FA189]">Touch.</span>
              </h1>

              {/* Information Cards Stack with Hover Lift Animation */}
              <div className="grid gap-4 max-w-lg">
                {[
                  { icon: <Phone size={22} />, label: "Phone Number", val: "9814129965" },
                  { icon: <Mail size={22} />, label: "Direct Email", val: "adhikarisushil219@gmail.com" },
                  { icon: <MessageSquare size={22} />, label: "Support Line", val: "cropcompass2025@gmail.com" }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    variants={cardVariants}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white/60 p-6 rounded-2xl flex items-center gap-6 border border-white shadow-sm hover:shadow-md hover:bg-white transition-colors cursor-pointer group"
                  >
                    <div className="w-12 h-12 bg-[#8FA189]/10 text-[#8FA189] group-hover:bg-[#8FA189] group-hover:text-white rounded-xl flex items-center justify-center transition-all duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black text-[#8FA189] tracking-widest">{item.label}</p>
                      <p className="text-lg font-bold text-[#3E4A3D] break-all">{item.val}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT SECTION: CIRCULAR PROFILE & SOCIALS */}
            <div className="w-full md:w-1/3 flex flex-col items-center text-center order-1 md:order-2">
              <div className="relative mb-8 group">
                {/* Pulsing background glow */}
                <motion.div 
                  className="absolute inset-0 bg-[#8FA189]/30 blur-3xl rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                ></motion.div>
                
                <div className="relative w-64 h-64 rounded-full border-[8px] border-white shadow-xl overflow-hidden transition-transform duration-500 group-hover:scale-105">
                   <img src="/sushil.png" alt="Sushil Adhikari" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-4xl font-semibold text-[#3E4A3D]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Sushil Adhikari
                </h2>
                <p className="text-[#8FA189] font-black uppercase tracking-[0.2em] text-[10px] mt-2">
                  Founder @ CropCompass
                </p>
                <p className="text-gray-400 text-sm font-sans italic mt-1">@sushil_adhikari87</p>
              </div>

              {/* Social Buttons Row */}
              <div className="flex gap-4">
                {[
                  { icon: <Facebook size={20} />, link: "https://facebook.com/sushil.adk.9" },
                  { icon: <Instagram size={20} />, link: "https://instagram.com/sushil_adhikari87/" },
                  { icon: <Youtube size={20} />, link: "https://youtube.com/@puranchourvlogs7930" }
                ].map((soc, i) => (
                  <motion.a 
                    key={i}
                    href={soc.link} 
                    target="_blank" 
                    rel="noreferrer"
                    whileHover={{ y: -3 }}
                    className="p-3 rounded-full bg-white border border-gray-100 text-[#8FA189] hover:bg-[#8FA189] hover:text-white transition-all shadow-sm"
                  >
                    {soc.icon}
                  </motion.a>
                ))}
              </div>
            </div>
            
          </div>
        </motion.div>

        {/* BOTTOM STRIP */}
        <div className="max-w-[1200px] w-full mt-12 bg-[#3E4A3D] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between shadow-xl border border-white/10">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#8FA189]/20 rounded-full flex items-center justify-center">
                 <Globe className="text-[#8FA189]" size={24} />
              </div>
              <div className="flex flex-col text-left">
                <p className="text-[#F5F7F2] font-sans text-sm tracking-wide">
                  Location: <span className="font-bold text-[#8FA189]">Pokhara, Nepal</span>
                </p>
              </div>
           </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;