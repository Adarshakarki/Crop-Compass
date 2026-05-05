import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react"; 
import { LogOut } from "lucide-react";

function SellerDashboard() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // New state for category
  const [loadingItems, setLoadingItems] = useState(true);
  const [error, setError] = useState(null);
 


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(
          `/api/v1/seller/allitems${selectedCategory ? `?category=${selectedCategory}` : ""}`
        );
        setItems(res.data.items || []);
      } catch (err) {
        setError("Failed to fetch items.");
      } finally {
        setLoadingItems(false);
      }
    };

    fetchItems();
  }, [selectedCategory]);

  // -----------------------------
  // Item Handlers
  // -----------------------------
  const handleRemoveItem = async (id) => {
    try {
      const res = await axios.delete(`/api/v1/seller/items/${id}`);
      alert(res.data.message);
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to remove the item.");
    }
  };

  const handleEditItem = (id) => navigate(`/edit-item/${id}`);

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0; path=/";
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-[#F5F7F2] text-[#3E4A3D]">
      {/* ------------------ Sidebar ------------------ */}
      <aside className="w-64 bg-[#F5F7F2] p-6 flex flex-col justify-between border-r border-[#8FA189]/20 shadow-lg">
        <div>
          <h2 className="text-2xl font-bold mb-8 text-[#3E4A3D]">Seller Panel</h2>

          <nav className="space-y-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="block w-full text-left text-[#8FA189] font-semibold hover:text-[#3E4A3D] transition-colors"
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
              className="block w-full text-left text-[#3E4A3D] hover:text-[#8FA189] transition-colors"
            >
              Orders
            </button>
          </nav>
        </div>

        <button
  onClick={handleLogout}
  className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition flex items-center justify-center"
>
  <LogOut size={18} />
</button>
      </aside>

      {/* ------------------ Main Content ------------------ */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[#DBE3D5] p-4 shadow-sm flex justify-between border-b border-[#8FA189]/20">
          <h1 className="text-2xl font-semibold text-[#3E4A3D]">Seller Dashboard</h1>
          <div className="flex space-x-4 items-center">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-md bg-white text-[#3E4A3D] focus:outline-none focus:ring-2 focus:ring-[#8FA189] shadow-lg transition-all duration-300 border border-[#8FA189]/30"
            >
              <option value="">All Categories</option>
              <option value="Seeds">Seeds</option>
              <option value="Fertilizers">Fertilizers</option>
            </select>
          </div>
        </header>

        {/* Body */}
        <section className="flex-1 overflow-y-auto p-10">
          {/* Stats */}
          

          {/* Items */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Your Vault (Items)</h2>

            {loadingItems ? (
              <p>Loading items...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : items.length === 0 ? (
              <p>No items found. Start adding some!</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {items.map((item) => (
                  <ItemCard
                    key={item._id}
                    item={item}
                    onEdit={handleEditItem}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}

/* -----------------------------------------
   Reusable Components
----------------------------------------- */

function StatCard({ title, value, color = "" }) {
  return (
    <div className="bg-[#F5F7F2] p-6 rounded-2xl shadow-lg border border-[#8FA189]/20">
      <h3 className="text-[#8FA189]">{title}</h3>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function ItemCard({ item, onEdit, onRemove }) {
  return (
    <div className="bg-[#F5F7F2] p-6 rounded-xl shadow-lg border border-[#8FA189]/20 flex flex-col">
      {/* Item Image (same logic as Home) */}
      <img
        src={`http://localhost:4000/${item.image?.replace(/\\/g, "/")}`}
        alt={item.name}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />

      <h3 className="text-lg font-semibold">{item.name}</h3>
      <p className="text-[#8FA189]">{item.description}</p>
      <p className="text-[#3E4A3D]">रु {item.price}</p>

      <div className="flex gap-2 mt-4">
        <button
  onClick={() => onEdit(item._id)}
  className="flex-1 bg-[#8FA189] text-white px-3 py-1 rounded-lg hover:bg-[#7c8f77] transition flex items-center justify-center"
>
  <Pencil size={18} />
</button>

        <button
  onClick={() => onRemove(item._id)}
  className="flex-1 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition flex items-center justify-center"
>
  <Trash2 size={18} />
</button>
      </div>
    </div>
  );
}

export default SellerDashboard;
