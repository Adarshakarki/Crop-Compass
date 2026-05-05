import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/api/v1/seller/orders");
        setOrders(res.data.orders || []);
      } catch (err) {
        setError("Failed to fetch orders.");
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0; path=/";
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-[#dbe3d5] text-[#3E4A3D]">
      {/* ------------------ Sidebar ------------------ */}
      <aside className="w-64 bg-[#F5F7F2] p-6 flex flex-col justify-between border-r border-[#8FA189]/20 shadow-lg">
        <div>
          <h2 className="text-2xl font-bold mb-8 text-[#3E4A3D]">Seller Panel</h2>

          <nav className="space-y-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="block w-full text-left text-[#3E4A3D] hover:text-[#8FA189] transition-colors"
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate("/additem")}
              className="block w-full text-left text-[#3E4A3D] hover:text-[#8FA189] transition-colors"
            >
              Add Item
            </button>

            <button
              onClick={() => navigate("/orders")}
              className="block w-full text-left text-[#8FA189] font-semibold hover:text-[#3E4A3D] transition-colors"
            >
              Orders
            </button>

           
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 rounded-md hover:bg-red-400 transition"
        >
          Logout
        </button>
      </aside>

      {/* ------------------ Main Content ------------------ */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[#dbe3d5] p-4 shadow-sm flex justify-between border-b border-[#8FA189]/20">
          <h1 className="text-2xl font-semibold text-[#3E4A3D]">Orders</h1>
          <p className="text-[#3E4A3D]">Manage customer orders</p>
        </header>

        {/* Body */}
        <section className="flex-1 overflow-y-auto p-10">
          {loadingOrders ? (
            <p>Loading orders...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))}
            </div>
          )}
        </section>

        <Footer />
      </main>
    </div>
  );
}

/* ------------------ Order Card ------------------ */

function OrderCard({ order }) {
  return (
    <div className="bg-[#F5F7F2] p-6 rounded-xl shadow-lg border border-[#8FA189]/20">
      <div className="flex justify-between items-center">
       
        <span className="px-3 py-1 bg-[#8FA189] text-white rounded-lg">
          {order.orderStatus}
        </span>
      </div>

      <p className="text-[#3E4A3D] mt-2">
        Payment Method: {order.paymentMethod}
      </p>
      <p className="text-[#3E4A3D]">
        Total Amount: NPR {order.totalAmount}
      </p>

      <h4 className="mt-4 font-semibold text-[#3E4A3D]">Buyer Details</h4>
      <p className="text-[#3E4A3D] text-sm">
        {order.buyer?.username} ({order.buyer?.email})
      </p>
      <p className="text-[#3E4A3D] text-sm">
        Phone: {order.buyer?.phone}
      </p>
      <p className="text-[#3E4A3D] text-sm">
        Location: {order.buyer?.deliverylocation}
      </p>

      <h4 className="mt-4 font-semibold text-[#3E4A3D]">Ordered Items</h4>
      <ul className="list-disc ml-5 text-[#3E4A3D]">
        {order.items.map((item) => (
          <li key={item._id}>
            {item.product?.name} × {item.quantity} (NPR {item.price})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Orders;
