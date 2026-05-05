import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/v1/buyer/profile");
        setUser(response.data.message);
      } catch (err) {
        console.error("Error fetching profile data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#d9e9cf]">
        <div className="text-[#4F6D46] text-2xl italic animate-pulse">Loading Profile...</div>
      </div>
    );
  }

  return (
    <div 
      className="flex flex-col min-h-screen relative" 
      style={{ 
        background: "linear-gradient(135deg, #d9e9cf 0%, #b6ceb4 100%)",
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
          Back to Home
        </button>
      </div>

      <main className="flex-grow flex flex-col items-center justify-center pt-32 pb-20 px-6">
        
        {/* Profile Card */}
        <div className="bg-[#B6CEB4] rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-[#D9E9CF]">
          
          {/* Header Section */}
          <div className="bg-[#96A78D] bg-opacity-20 p-10 text-center border-b border-[#D9E9CF]">
            <h1 className="text-4xl font-bold text-[#4F6D46] italic uppercase tracking-tighter">
              {user?.username || "User Name"}
            </h1>
            <div className="inline-block mt-3 px-4 py-1 bg-[#4F6D46] text-white text-xs font-bold rounded-full uppercase tracking-[0.2em]">
              {user?.role || "Buyer Account"}
            </div>
          </div>

          {/* Details Section */}
          <div className="p-10 space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <div className="border-l-2 border-[#96A78D] pl-4">
                <span className="text-[#4F6D46] text-xs font-bold uppercase tracking-widest opacity-60">Email Address</span>
                <p className="text-xl text-[#4F6D46] font-medium">{user?.email}</p>
              </div>

              <div className="border-l-2 border-[#96A78D] pl-4">
                <span className="text-[#4F6D46] text-xs font-bold uppercase tracking-widest opacity-60">Phone Number</span>
                <p className="text-xl text-[#4F6D46] font-medium">{user?.phone || "Not Provided"}</p>
              </div>

              <div className="border-l-2 border-[#96A78D] pl-4">
                <span className="text-[#4F6D46] text-xs font-bold uppercase tracking-widest opacity-60">Delivery Location</span>
                <p className="text-xl text-[#4F6D46] font-medium italic">{user?.deliverylocation || "No location set"}</p>
              </div>
            </div>

            {/* Solid Botanical Green Logout Button */}
            <div className="pt-6">
              <button
  onClick={handleLogout}
  className="w-full py-4 bg-[#4F6D46] hover:bg-[#3d5537] text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform active:scale-95 flex items-center justify-center"
>
  <LogOut size={22} />
</button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Profile;