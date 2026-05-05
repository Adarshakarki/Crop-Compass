import React, { useState } from "react";
import axios from "axios";
import { Wheat, BadgeInfo, Sprout, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CropRecommendation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    boron: "", clay: "", nitrogen: "", organic: "", k: "",
    p2o5: "", ph: "", sand: "", slit: "", zinc: "",
    avg_temp: "", avg_rain: ""
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  // Tooltip data matching your original design
  const infoData = {
    boron: "Boron helps in cell wall formation and growth.",
    clay: "Clay percentage affects soil water retention.",
    nitrogen: "Nitrogen is essential for leafy growth.",
    organic: "Organic matter improves soil fertility.",
    k: "Potassium (K) improves root development and stress tolerance.",
    p2o5: "Phosphorus (P₂O₅) is vital for energy transfer and root growth.",
    ph: "pH affects nutrient availability in soil.",
    sand: "Sand content influences drainage and aeration.",
    slit: "Silt improves soil fertility and water retention.",
    zinc: "Zinc is important for enzyme function in plants.",
    avg_temp: "Average temperature affects crop growth cycle.",
    avg_rain: "Average rainfall determines water availability."
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Connect to Flask ML server on Port 5001
      const res = await axios.post("http://localhost:5001/predict", formData);
      setPrediction(res.data.recommendation);
    } catch (err) {
      console.error("Connection Error:", err);
      alert("Error: Ensure your Flask ML server is running on port 5001");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex flex-col font-sans">
      <Navbar />

      {/* Back Navigation */}
      <button 
        onClick={() => navigate("/home")}
        className="fixed top-24 left-8 z-50 flex items-center gap-2 text-[#2d5a27] hover:text-[#4CAF50] transition-all font-bold"
      >
        <ArrowLeft size={20} /> Back to Home
      </button>

      <div className="flex-grow flex items-center justify-center pt-32 pb-16 px-4">
        <div className="max-w-6xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
          
          {/* LEFT SIDE: Image Section (Matches your form-image div) */}
          <div className="md:w-2/5 relative min-h-[400px]">
            <img 
              src="/crop.jpg" 
              alt="Agriculture" 
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1495107333211-66580c2cf59b?auto=format&fit=crop&q=80&w=600"; }}
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-8 left-8 text-white z-10">
              <h3 className="text-2xl font-bold italic">Precision Farming</h3>
              <p className="text-sm opacity-90">Maximize yield with ML analysis.</p>
            </div>
          </div>

          {/* RIGHT SIDE: Form Fields (Matches your form-fields div) */}
          <div className="md:w-3/5 p-8 lg:p-12">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-[#2d5a27] flex items-center gap-3">
                <Wheat className="text-[#4CAF50]" />
                Crop Recommendation System
              </h1>
              <h2 className="text-gray-500 font-medium mt-1 uppercase text-xs tracking-widest">
                Soil & Climate Parameters
              </h2>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.keys(formData).map((key) => (
                  <div key={key} className="relative group flex items-center bg-[#f9fdf9] border border-[#e0ede0] rounded-xl transition-all focus-within:border-[#4CAF50] focus-within:ring-1 focus-within:ring-[#4CAF50]">
                    <input
                      name={key}
                      type="number"
                      step="any"
                      placeholder={key.replace("_", " ").toUpperCase()}
                      required
                      value={formData[key]}
                      onChange={handleChange}
                      className="w-full p-3.5 bg-transparent outline-none text-gray-700 placeholder:text-gray-400 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => alert(infoData[key])}
                      className="p-3 text-[#4CAF50] hover:text-[#2d5a27] transition-colors"
                      title="Click for info"
                    >
                      <BadgeInfo size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#4CAF50] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#45a049] transition-all shadow-md active:transform active:scale-[0.98] disabled:opacity-70 flex justify-center items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analyzing Soil...
                  </>
                ) : "Recommend Crop"}
              </button>
            </form>

            {/* RESULT SECTION (Matches your integrated-result div) */}
            {prediction && (
              <div className="mt-8 p-6 bg-[#e8f5e9] border-l-8 border-[#4CAF50] rounded-r-2xl flex items-center gap-5 shadow-inner animate-in fade-in zoom-in duration-500">
                <div className="bg-[#4CAF50] p-3 rounded-full">
                  <Sprout size={28} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-[#2d5a27] uppercase tracking-[0.2em] mb-1">Recommendation</p>
                  <h3 className="text-3xl font-extrabold text-[#2d5a27]">
                    {prediction}
                  </h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CropRecommendation;