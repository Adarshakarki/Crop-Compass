import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Sprout, Microscope, ArrowRight, ArrowLeft } from "lucide-react"; 
import Footer from "../components/Footer";

const About = () => {
  const navigate = useNavigate();

  // Animation variants for the staggered cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#dbe3d5] font-sans">
      <main className="flex-grow flex flex-col items-center pt-12 pb-16 px-6">
        
        {/* HERO CARD - Mirroring Contact/Features layout */}
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

          <div className="flex flex-col md:flex-row gap-16 items-center relative z-10">
            {/* LEFT CONTENT SECTION */}
            <div className="flex-1 order-2 md:order-1">
              <div className="flex items-center gap-2 text-[#8FA189] font-bold mb-4">
                <span className="h-[2px] w-8 bg-[#8FA189]"></span>
                <span className="uppercase tracking-[0.3em] text-[10px]">Our Vision</span>
              </div>
              
              <h1 className="text-6xl font-semibold text-[#3E4A3D] mb-8 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Precision Farming. <br /> 
                <span className="italic text-[#8FA189]">Intelligent Trade.</span>
              </h1>
              
              <p className="text-xl text-[#3E4A3D]/70 leading-relaxed max-w-xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                CropCompass utilizes Machine Learning to bridge the gap between 
                scientific soil analysis and the digital marketplace.
              </p>
              <p className="text-lg text-[#3E4A3D]/60 leading-relaxed max-w-xl font-sans">
                We empower Nepalese farmers with data-driven confidence, ensuring every seed planted 
                has the best chance for a high-yield harvest.
              </p>
            </div>
            
            {/* RIGHT IMAGE VISUAL - Matching 4:5 Aspect Ratio */}
            <div className="w-full md:w-1/3 aspect-[4/5] relative group order-1 md:order-2">
              <div className="absolute inset-0 bg-[#8FA189]/10 blur-2xl rounded-2xl group-hover:bg-[#8FA189]/20 transition-all duration-700"></div>
              <div className="relative w-full h-full bg-white rounded-2xl border border-[#8FA189]/30 shadow-xl overflow-hidden p-2">
                <img 
                  src="/about.jpg" 
                  alt="Agri Tech" 
                  className="w-full h-full object-cover rounded-xl grayscale-[10%] group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105" 
                />
              </div>
            </div>
          </div>

          {/* SERVICE CARDS - Staggered Bottom Grid */}
          <motion.div 
            className="grid md:grid-cols-3 gap-6 mt-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { 
                icon: <ShoppingCart size={28} />, 
                title: "Verified Shop", 
                desc: "Connecting growers directly with buyers using ML quality verification." 
              },
              { 
                icon: <Sprout size={28} />, 
                title: "Fertilizer Help", 
                desc: "Precision NPK recommendations based on real-time soil data analysis." 
              },
              { 
                icon: <Microscope size={28} />, 
                title: "Crop Prediction", 
                desc: "ML models suggesting the most profitable crops for your specific land." 
              }
            ].map((service, idx) => (
              <motion.div 
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="p-8 bg-white rounded-2xl border border-[#8FA189]/10 shadow-sm hover:border-[#8FA189]/40 hover:shadow-md transition-all group cursor-default"
              >
                <div className="text-[#8FA189] mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#3E4A3D] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500 font-sans leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA SECTION - Updated for consistency */}
        <motion.div 
          className="max-w-[1200px] w-full mt-16 bg-[#3E4A3D] rounded-3xl p-12 flex flex-col md:flex-row justify-between items-center text-[#F5F7F2] shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Ready to grow?</h2>
            <p className="text-[#F5F7F2]/60 font-sans text-sm tracking-wide">Join our network of farmers and buyers today.</p>
          </div>
          
          <motion.button 
            onClick={() => navigate("/buyersignup")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 md:mt-0 relative z-10 flex items-center gap-3 bg-[#8FA189] px-10 py-4 rounded-xl font-bold text-white hover:bg-white hover:text-[#3E4A3D] transition-all shadow-xl"
          >
            Get Started <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default About;