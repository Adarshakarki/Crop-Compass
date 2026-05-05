import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const FertilizerRecommendation = () => {
  const [crops, setCrops] = useState({});
  const [selectedCrop, setSelectedCrop] = useState("");
  const [inputs, setInputs] = useState({ n: "", p: "", k: "" });
  
  // Modal States
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [modalData, setModalData] = useState({ title: "", text: "" });
  const [resultHTML, setResultHTML] = useState("");

  useEffect(() => {
    fetch("/npk.json")
      .then((res) => res.json())
      .then((data) => setCrops(data))
      .catch((err) => console.error("Error loading NPK data:", err));
  }, []);

  const openInfo = (type) => {
const info = { 
  n: { 
    title: "Nitrogen (N)", 
    text: "Nitrogen is essential for leaf growth and vegetation. It provides the green color to plants.\nApply heavy irrigation to leach excess nitrate from soil." 
  },
  p: { 
    title: "Phosphorus (P)", 
    text: "Phosphorus supports root development and helps in flower and fruit production.\nApply lime in acidic soil to reduce excess phosphorus availability." 
  },
  k: { 
    title: "Potassium (K)", 
    text: "Potassium improves disease resistance and overall plant vigor.\nUse heavy irrigation with good drainage to leach excess potassium." 
  },
  unit: { 
    title: "Fertilizer requirement", 
    text: "Nutrients are calculated in kg/ropani." 
  }
};
    setModalData(info[type]);
    setIsInfoOpen(true);
  };

  const calculateNPK = () => {
    if (!selectedCrop) return alert("Select a crop!");

    const base = crops[selectedCrop];
    const nDiff = base.n - Number(inputs.n);
    const pDiff = base.p - Number(inputs.p);
    const kDiff = base.k - Number(inputs.k);

    const formatResult = (label, val) => {
      const isExcess = val < 0;
      const color = isExcess ? "#dc2626" : "#15803d";
      const status = isExcess ? "(Excess)" : "(Needed)";
      return `<div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="font-weight: 600;">${label}:</span> 
                <span style="color: ${color}; font-weight: 800;">${Math.abs(val).toFixed(2)} kg ${status}</span>
              </div>`;
    };

    const finalHTML = `
      <div style="margin-top: 15px;">
        ${formatResult("N ", nDiff )}
        ${formatResult("P ", pDiff )}
        ${formatResult("K", kDiff)}
      </div>
    `;

    setResultHTML(finalHTML);
    setIsResultOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#dbe3d5] font-serif flex flex-col relative">
      <Navbar />

      <div className="flex-grow flex items-center justify-center pt-24 pb-12 px-4">
        <div className="flex flex-col md:flex-row bg-[#f5f7f2] rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full">
          
          <div className="md:w-2/5 h-40 md:h-auto bg-[#f5f7f2]">
            <img src="/crop_image.jpg" className="w-full h-full object-cover" alt="fertilizer" />
          </div>

          <div className="w-full md:w-3/5 p-8 bg-[#d9e9cf]">
            {/* --- Updated Header with Icon --- */}
            <div className="flex items-center gap-2 mb-6">
              <h1 className="text-xl font-bold text-[#4F6D46]">Fertilizer Requirement</h1>
              <button onClick={() => openInfo("unit")} className="hover:opacity-70 transition-opacity p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-badge-info"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-[#B6CEB4] p-3 rounded-xl shadow-inner border border-[#a5bda3]">
                <label className="block text-[#4F6D46] text-sm font-bold mb-1">Crop Selection</label>
                <select
                  className="w-full p-2 text-sm rounded-lg outline-none bg-white border border-transparent focus:border-[#4F6D46]"
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  value={selectedCrop}
                >
                  <option value="">--Select Crop--</option>
                  {Object.keys(crops).map((c) => (<option key={c} value={c}>{c}</option>))}
                </select>
              </div>

              {["n", "p", "k"].map((type) => (
                <div key={type} className="bg-[#B6CEB4] p-3 rounded-xl shadow-inner border border-[#a5bda3]">
                  <div className="flex justify-between items-center mb-1 px-1">
                    <span className="text-[#4F6D46] text-xs uppercase font-bold">
                      {type === 'n' ? 'Nitrogen (N)' : type === 'p' ? 'Phosphorus (P)' : 'Potassium (K)'}
                    </span>
                    <button onClick={() => openInfo(type)} className="hover:opacity-70 transition-opacity p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-badge-info"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>
                    </button>
                  </div>
                  <input
                    type="number"
                    className="w-full p-2 text-sm rounded-lg outline-none bg-white border border-transparent focus:border-[#4F6D46]"
                    placeholder={`Enter value kg/ropani`}
                    value={inputs[type]}
                    onChange={(e) => setInputs({ ...inputs, [type]: e.target.value })}
                  />
                </div>
              ))}

              <button onClick={calculateNPK} className="w-full bg-[#4F6D46] text-white py-3 rounded-xl font-bold hover:bg-[#3d5536] transition-all shadow-md active:scale-95 mt-2">
                Fertilizer calculation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* INFO MODAL */}
      {isInfoOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100]">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-[90%] relative shadow-2xl">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-black" onClick={() => setIsInfoOpen(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <h3 className="text-lg font-bold text-[#4F6D46] border-b pb-2 mb-3">{modalData.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{modalData.text}</p>
          </div>
        </div>
      )}

      {/* RESULT MODAL */}
      {isResultOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100]">
          <div className="bg-white rounded-2xl p-8 max-w-md w-[90%] relative shadow-2xl">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-black" onClick={() => setIsResultOpen(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <h3 className="text-xl font-bold text-[#4F6D46] mb-2">Recommended Fertilizer Addition</h3>
            <div className="text-gray-700 pt-4" dangerouslySetInnerHTML={{ __html: resultHTML }} />
            <button onClick={() => setIsResultOpen(false)} className="mt-8 w-full py-3 bg-[#4F6D46] text-white rounded-xl font-bold shadow-lg hover:bg-[#3d5536]">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FertilizerRecommendation;