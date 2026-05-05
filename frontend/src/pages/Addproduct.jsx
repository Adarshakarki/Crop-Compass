import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please upload an image.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("image", imageFile);

    try {
      const response = await axios.post("/api/v1/seller/additems", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        alert("Product added successfully!");
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
        });
        setImageFile(null);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error.response || error);
      alert(`Error: ${error.response?.data?.message || "Failed to add product."}`);
    }
  };

return (
  <div
    className="flex flex-col min-h-screen relative"
    style={{
      background: "#dbe3d5",
      fontFamily: "'Cormorant Garamond', serif"
    }}
  >
      {/* Navbar has been removed from here */}

      {/* Top Left Back Button - Positioned slightly higher since Navbar is gone */}
      <div className="absolute top-8 left-8 z-10">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-[#4F6D46] hover:opacity-70 transition-all font-bold italic text-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </button>
      </div>

      <main className="flex-grow flex flex-col items-center justify-center py-20 px-6">
        <motion.div
          className="bg-[#f5f7f2] p-10 rounded-3xl shadow-2xl max-w-2xl w-full border border-[#D9E9CF]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-[#4F6D46] text-center mb-8 italic uppercase tracking-tight">
            Add a New Product
          </h1>
          
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            encType="multipart/form-data"
          >
            {/* Name Field */}
            <div>
              <label className="block text-sm font-bold text-[#4F6D46] uppercase tracking-widest mb-2 ml-1">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-5 py-3 rounded-xl bg-[#F5F7F2] text-[#4F6D46] focus:outline-none focus:ring-2 focus:ring-[#96A78D] border border-[#D9E9CF] transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price Field */}
              <div>
                <label className="block text-sm font-bold text-[#4F6D46] uppercase tracking-widest mb-2 ml-1">
                  Price (रु)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-xl bg-[#F5F7F2] text-[#4F6D46] focus:outline-none focus:ring-2 focus:ring-[#96A78D] border border-[#D9E9CF]"
                  required
                />
              </div>

              {/* Category Field */}
              <div>
                <label className="block text-sm font-bold text-[#4F6D46] uppercase tracking-widest mb-2 ml-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-xl bg-[#F5F7F2] text-[#4F6D46] focus:outline-none focus:ring-2 focus:ring-[#96A78D] border border-[#D9E9CF] appearance-none"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Seeds">Seeds</option>
                  <option value="Fertilizers">Fertilizers</option>
                </select>
              </div>
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-bold text-[#4F6D46] uppercase tracking-widest mb-2 ml-1">
                Detailed Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="6"
                className="w-full px-5 py-3 rounded-xl bg-[#F5F7F2] text-[#4F6D46] focus:outline-none focus:ring-2 focus:ring-[#96A78D] border border-[#D9E9CF] resize-none"
                required
              ></textarea>
            </div>

            {/* Image Field */}
            <div>
              <label className="block text-sm font-bold text-[#4F6D46] uppercase tracking-widest mb-2 ml-1">
                Product Image
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-5 py-3 rounded-xl bg-[#F5F7F2] text-[#4F6D46] border border-[#D9E9CF] file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-[#4F6D46] file:text-white hover:file:bg-[#3D5537] cursor-pointer"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#4F6D46] text-white py-4 rounded-xl font-bold text-xl shadow-lg hover:bg-[#3D5537] transition-all duration-300 transform active:scale-95 uppercase tracking-widest"
              >
                List Product
              </button>
            </div>
          </form>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

export default AddProduct;