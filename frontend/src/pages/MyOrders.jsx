import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { ArrowLeft } from "lucide-react"; 
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function MyOrders() {
  const navigate = useNavigate(); 
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/api/v1/buyer/myorders");
      setOrders(res.data.orders || []);
    } catch (err) {
      setError("Failed to fetch orders.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await axios.patch(`/api/v1/buyer/order/${orderId}/cancel`);
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, orderStatus: "Cancelled" } : o
        )
      );
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to cancel order.";
      alert(msg);
    }
  };

  return (
    <div className="min-h-screen bg-[#dbe3d5] text-[#3E4A3D] flex flex-col font-sans">
      <Navbar />
      
      {/* Back Button */}
      <button 
        onClick={() => navigate("/home")}
        className="fixed top-24 left-8 z-[60] flex items-center gap-2 text-[#3E4A3D] hover:text-[#4F6D46] transition-all font-bold group italic text-lg"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        <ArrowLeft 
          size={22} 
          className="group-hover:-translate-x-1 transition-transform duration-300" 
        />
        Back
      </button>

      <div className="flex-grow p-10 md:pt-32 md:pb-16 max-w-[1200px] mx-auto w-full">
        <h1 className="text-4xl font-semibold text-[#3E4A3D] mb-8 text-center" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          My Orders
        </h1>

        {loading ? (
          <p className="text-center text-lg mt-10">Loading orders...</p>
        ) : error ? (
          <p className="text-red-600 text-center text-lg mt-10">{error}</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-lg mt-10">No orders found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white p-6 rounded-2xl shadow-lg flex flex-col border border-[#8FA189]/10 hover:shadow-xl transition-all"
              >
                <p className="text-gray-500 mb-2 text-sm">
                  Status: <span className="font-medium text-[#3E4A3D]">{order.orderStatus}</span>
                </p>
                <p className="text-gray-500 mb-4 text-sm">
                  Ordered on: <span className="font-medium text-[#3E4A3D]">{new Date(order.orderedAt).toLocaleDateString()}</span>
                </p>

                <div className="space-y-4 flex-grow">
                  {order.items.map((item) => (
                    <div
                      key={item.product ? item.product._id : `missing-product-${item._id}`}
                      className="flex items-center gap-4 bg-[#F5F7F2] p-3 rounded-lg border border-[#8FA189]/5"
                    >
                      {item.product && item.product.image ? (
                        <img
                          src={`http://localhost:4000/${item.product.image.replace(/\\\\/g, "/")}`}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-md border border-[#8FA189]/30"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-sm">
                          No Image
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#3E4A3D]">{item.product ? item.product.name : "Unknown Product"}</h3>
                        <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                        <p className="text-[#8FA189] font-bold">रु {item.price || "N/A"}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cancel Button + Total aligned */}
                <div className="mt-6 flex items-center justify-between">
                  {order.orderStatus === "Pending" && (
                    <button
                      onClick={() => handleCancelOrder(order._id)}
                      className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
        >
                      Cancel Order
                    </button>
                  )}
                  <p className="text-xl font-bold text-[#3E4A3D]">
                    Total: <span className="text-[#8FA189]">रु {order.totalAmount}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default MyOrders;