import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { itemsincart, noofitemsincart } from "../store/atom";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [cartItemIds, setCartItemIds] = useRecoilState(itemsincart);
  const [noOfItemsInCart, setNoOfItemsInCart] = useRecoilState(noofitemsincart);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const quantityMap = {};
        cartItemIds.forEach((id) => {
          quantityMap[id] = (quantityMap[id] || 0) + 1;
        });
        const uniqueIds = [...new Set(cartItemIds)];
        const fetchedItems = [];
        for (const id of uniqueIds) {
          const res = await axios.get(`/api/v1/buyer/productdetails/${id}`);
          fetchedItems.push({ ...res.data.product, quantity: quantityMap[id] });
        }
        setCartItems(fetchedItems);
        setNoOfItemsInCart(cartItemIds.length);
      } catch (error) {
        console.error("Error loading cart items:", error);
      } finally {
        setLoading(false);
      }
    };
    if (cartItemIds.length > 0) fetchCartItems();
    else { setCartItems([]); setLoading(false); setNoOfItemsInCart(0); }
  }, [cartItemIds, setNoOfItemsInCart]);

  const handleRemoveOne = (idToRemove) => {
    const index = cartItemIds.indexOf(idToRemove);
    if (index !== -1) {
      const updatedCart = [...cartItemIds];
      updatedCart.splice(index, 1);
      setCartItemIds(updatedCart);
      setNoOfItemsInCart(updatedCart.length);
    }
  };

  const handleClearCart = () => {
    setCartItemIds([]);
    setNoOfItemsInCart(0);
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrder = async () => {
    try {
      const orderData = {
        items: cartItems.map((item) => ({ product: item._id, quantity: item.quantity, price: item.price })),
        totalAmount: totalPrice,
        paymentMethod: "Esewa",
      };
      const res = await axios.post("/api/v1/buyer/order", orderData);
      if (res.status === 201) {
        
        handleClearCart();
        navigate("/payment", { state: { totalAmount: totalPrice } });
      }
    } catch (error) { console.error("Order failed:", error); }
  };

  return (
    <div className="flex flex-col min-h-screen relative" style={{ background: "linear-gradient(135deg, #d9e9cf 0%, #b6ceb4 100%)", fontFamily: "'Cormorant Garamond', serif" }}>
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

      <main className="flex-grow">
        <div className="pt-32 pb-20 px-8 flex flex-col items-center">
          
          {loading ? (
            <div className="text-[#4F6D46] text-center text-xl italic animate-pulse">Gathering your items...</div>
          ) : cartItems.length > 0 ? (
            <div className="max-w-5xl w-full">
              <div className="bg-[#f5f7f2] rounded-2xl shadow-2xl overflow-hidden border border-[#D9E9CF]">
                <div className="grid grid-cols-12 gap-4 px-10 py-5 bg-[#f5f7f2] bg-opacity-20 border-b border-[#D9E9CF] text-[#4F6D46] font-bold uppercase tracking-wider text-xs md:text-sm">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Total Price</div>
                  <div className="col-span-2 text-right pr-4">Actions</div>
                </div>

                <ul className="divide-y divide-[#D9E9CF]">
                  {cartItems.map((item) => (
                    <li key={item._id} className="grid grid-cols-12 gap-4 px-10 py-6 items-center">
                      <div className="col-span-6 flex items-center">
                        <div className="bg-[#f5f7f2] p-1 border border-[#D9E9CF] rounded-lg mr-4 flex-shrink-0">
                          <img src={`http://localhost:4000/${item.image.replace(/\\/g, "/")}`} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-[#4F6D46]">{item.name}</h2>
                          <p className="text-[#4F6D46] opacity-60 italic text-sm">रु {item.price}/unit</p>
                        </div>
                      </div>
                      <div className="col-span-2 text-center text-xl font-semibold text-[#4F6D46]">{item.quantity}</div>
                      <div className="col-span-2 text-center text-xl font-bold text-[#4F6D46]">रु {(item.price * item.quantity).toLocaleString()}</div>
                      <div className="col-span-2 text-right pr-4">
                        <button onClick={() => handleRemoveOne(item._id)} className="text-red-600 hover:text-red-800 transition-all p-2 rounded-full hover:bg-red-50 inline-block">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="bg-[#f5f7f2] bg-opacity-30 px-10 py-8 flex justify-between items-center border-t border-[#D9E9CF]">
                  <h2 className="text-3xl font-bold text-[#4F6D46] italic">Order Total</h2>
                  <p className="text-4xl font-black text-[#4F6D46]">रु {totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                </div>
              </div>

              <div className="flex justify-center gap-8 mt-12">
                <button onClick={handleOrder} className="px-12 py-4 bg-[#96A78D] hover:bg-[#4F6D46] text-white font-bold rounded-lg shadow-lg border border-[#D9E9CF] transition-all duration-300 transform active:scale-95">Pay with Esewa</button>
                <button onClick={handleClearCart} className="px-12 py-4 bg-transparent text-[#4F6D46] font-bold rounded-lg border border-[#D9E9CF] hover:bg-[#4F6D46] hover:text-white transition-all duration-300">Clear Cart</button>
              </div>
            </div>
          ) : (
            <div className="text-center mt-20">
              <p className="text-3xl italic text-[#4F6D46] opacity-70">Your cart is empty.</p>
              <button onClick={() => navigate('/home')} className="mt-8 px-10 py-3 bg-[#4F6D46] text-white font-bold rounded-lg shadow-md hover:opacity-90 transition-all">Return to Shop</button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default Cart;