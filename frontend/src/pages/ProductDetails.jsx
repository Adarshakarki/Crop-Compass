import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { itemsincart, noofitemsincart } from "../store/atom";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentCartItems = useRecoilValue(itemsincart);
  const setItemsInCart = useSetRecoilState(itemsincart);
  const setNoOfItemsInCart = useSetRecoilState(noofitemsincart);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/v1/buyer/productdetails/${id}`);
        setProduct(response.data.product);
      } catch (err) {
        setError("Failed to fetch product details. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    setItemsInCart([...currentCartItems, id]);
    setNoOfItemsInCart((prevCount) => prevCount + 1);
  };

return (
  <div
    className="flex flex-col min-h-screen relative"
    style={{
      background: "#dbe3d5",
      fontFamily: "'Cormorant Garamond', serif"
    }}
  >
      <Navbar />

      {/* Top Left Back Button */}
      <div className="absolute top-24 left-8 z-10">
        <button 
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 text-[#4F6D46] hover:opacity-70 transition-all font-bold italic text-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
      </div>

      <main className="flex-grow flex flex-col items-center justify-center py-10 px-6">
        {loading && <div className="text-[#4F6D46] text-xl font-bold">Loading...</div>}
        {error && <div className="text-red-700 font-bold">{error}</div>}

        {!loading && !error && product && (
          <div className="bg-[#f5f7f2] rounded-3xl shadow-2xl max-w-4xl w-full flex flex-col md:flex-row overflow-hidden border border-[#D9E9CF]">
            <div className="md:w-1/2 bg-[#f5f7f2] p-5 flex items-center justify-center">
              <div className="w-full h-80 md:h-96 rounded-2xl overflow-hidden border border-[#D9E9CF] shadow-sm">
                <img
                  src={`http://localhost:4000/${product.image.replace(/\\/g, "/")}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="space-y-5">
                <h1 className="text-4xl md:text-5xl font-bold text-[#4F6D46] italic leading-tight uppercase tracking-tight">
                  {product.name}
                </h1>
                <p className="text-[#4F6D46] text-lg md:text-xl leading-relaxed opacity-90 border-l-2 border-[#96A78D] pl-5 py-1">
                  {product.description}
                </p>
                <div className="pt-2">
                  <span className="text-3xl font-bold text-[#4F6D46]">
                    रु {product.price.toLocaleString()}
                  </span>
                </div>
                <div className="pt-6">
                  <button
                    onClick={handleAddToCart}
                    className="flex items-center justify-center gap-4 w-full bg-[#96A78D] text-white font-bold rounded-xl px-8 py-4 transition-all duration-300 hover:bg-[#4F6D46] shadow-lg border border-[#D9E9CF] outline-none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-xl">Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
export default ProductDetails;