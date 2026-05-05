import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Info, ShoppingCart, Search, ChevronDown } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// --- Product Card Component ---
const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
  if (!product) return null;
  
  return (
    <div className="bg-[#ffff] p-4 rounded-3xl border border-[#96A78D] shadow-sm flex flex-col h-full transition-all hover:shadow-md hover:-translate-y-1">
      
      {/* Image container */}
      <div className="h-56 w-full overflow-hidden rounded-2xl border-2 border-[#96A78D] mb-4 bg-white">
        <img
          src={product.image ? `http://localhost:4000/${product.image.replace(/\\/g, "/")}` : "/placeholder.png"}
          alt={product.name || "Product"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info Section - Left Aligned */}
      <div className="flex flex-col items-start px-1 flex-grow text-[#4F6D46]">
        <h3 className="text-xl font-bold capitalize font-serif mb-0.5 tracking-tight">
          {product.name || "Untitled Product"}
        </h3>
        <p className="font-bold text-base font-serif italic mb-5">
          रु {product.price || "0"}
        </p>

        {/* Action Buttons Row */}
        <div className="flex gap-2 w-full mt-auto">
          {/* Info Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product._id);
            }}
            className="flex-1 bg-[#96A78D] hover:bg-[#4F6D46] py-2.5 rounded-xl flex items-center justify-center transition-all cursor-pointer group"
          >
            <Info size={20} className="text-[#D9E9CF]" />
          </button>

          
        </div>
      </div>
    </div>
  );
};

function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/v1/buyer/allitems${selectedCategory ? `?category=${selectedCategory}` : ""}`
        );
        setProducts(response.data.products || []);
      } catch (err) {
        console.error("API Fetch Error:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  // Handler for adding to cart and redirecting
  const handleAddToCart = (product) => {
    // If you have a backend cart, you'd call axios.post here first
    // For now, we direct the user to the cart page
    navigate('/cart');
  };

  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div 
      className="flex flex-col min-h-screen font-serif"
      style={{ 
        background: "linear-gradient(135deg, #d9e9cf 0%, #b6ceb4 100%)",
        fontFamily: "'Cormorant Garamond', serif" 
      }}
    >
      <Navbar />

      <main className="flex-grow pt-28 pb-20 px-6 flex justify-center">
        <div className="w-full max-w-[1300px] bg-[#F5F7F2] rounded-[3rem] p-8 md:p-12 shadow-2xl">
          
          {/* Search/Category Row */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#4F6D46]/60" size={18} />
              <input
                type="text"
                placeholder="Search products.."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#ffff] border border-[#96A78D] focus:border-[#4F6D46] outline-none transition-all text-[#4F6D46] text-base placeholder-[#4F6D46]/40 shadow-sm"
              />
            </div>

            <div className="relative w-full md:w-60">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none px-6 py-3 rounded-xl bg-[#ffff] border border-[#96A78D] focus:border-[#4F6D46] outline-none cursor-pointer text-[#4F6D46] text-base shadow-sm"
              >
                <option value="">All Categories</option>
                <option value="Seeds">Seeds</option>
                <option value="Fertilizers">Fertilizers</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4F6D46]/70 pointer-events-none" size={18} />
            </div>
          </div>

          {/* Grid Feed */}
          {loading ? (
            <div className="flex justify-center py-40">
              <div className="w-10 h-10 border-4 border-[#4F6D46] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onViewDetails={(id) => navigate(`/productdetails/${id}`)}
                    onAddToCart={handleAddToCart} 
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-20 text-[#4F6D46] italic opacity-60">
                  No products found.
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;