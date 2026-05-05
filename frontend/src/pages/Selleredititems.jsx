import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`/api/v1/seller/items/${id}`);
        const item = response.data.product;
        setFormData({
          name: item.name,
          description: item.description,
          price: item.price,
          image: null,
        });
      } catch (err) {
        console.error(err);
        setError("Failed to fetch item details.");
      } finally {
        setLoading(false);
      }
    };
    fetchItemDetails();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const updateData = new FormData();
      updateData.append("name", formData.name);
      updateData.append("description", formData.description);
      updateData.append("price", formData.price);
      if (formData.image) updateData.append("image", formData.image);

      const response = await axios.put(`/api/v1/seller/items/${id}`, updateData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(response.data.message);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to update item.");
    }
  };

  if (loading) return <p className="text-center mt-20 text-[#3E4A3D]">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-20">{error}</p>;

  return (
    <div
      className="flex flex-col min-h-screen relative"
      style={{
        background: "linear-gradient(135deg, #d9e9cf 0%, #b6ceb4 100%)",
        fontFamily: "'Cormorant Garamond', serif",
      }}
    >
      <div className="absolute top-8 left-8 z-10">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-[#4F6D46] hover:opacity-70 transition-all font-bold italic text-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
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
            Edit Item
          </h1>

          <form className="space-y-6" onSubmit={handleSave} encType="multipart/form-data">
            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-[#4F6D46] uppercase tracking-widest mb-2 ml-1">
                Name
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

            {/* Price */}
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

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-[#4F6D46] uppercase tracking-widest mb-2 ml-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="6"
                className="w-full px-5 py-3 rounded-xl bg-[#F5F7F2] text-[#4F6D46] focus:outline-none focus:ring-2 focus:ring-[#96A78D] border border-[#D9E9CF] resize-none"
                required
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-bold text-[#4F6D46] uppercase tracking-widest mb-2 ml-1">
                Update Image
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-5 py-3 rounded-xl bg-[#F5F7F2] text-[#4F6D46] border border-[#D9E9CF] file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-[#4F6D46] file:text-white hover:file:bg-[#3D5537] cursor-pointer"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#4F6D46] text-white py-4 rounded-xl font-bold text-xl shadow-lg hover:bg-[#3D5537] transition-all duration-300 transform active:scale-95 uppercase tracking-widest"
              >
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

export default EditItem;