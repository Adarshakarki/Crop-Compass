import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ShoppingCart, 
  User, 
  ListOrdered, 
  Menu, 
  X, 
  Store,        // Replaced ShoppingBag
  Sprout, 
  SprayCan      // Replaced FlaskConical
} from "lucide-react";
import { useRecoilValue } from "recoil";
import { noofitemsincart } from "../store/atom";

function Navbar() {
  const noOfItems = useRecoilValue(noofitemsincart);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuLinkStyles = "group flex items-center justify-center space-x-6 px-4 py-2 text-white font-serif font-extrabold text-3xl md:text-5xl lg:text-7xl transition-all duration-300 hover:italic hover:scale-105 tracking-tight whitespace-nowrap bg-transparent";

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#dbe3d5]/80 backdrop-blur-md z-[100] py-4 px-10 flex justify-between items-center border-b border-[#3E4A3D]/10 font-serif">
      
      {/* Brand Logo & Menu Toggle */}
      <div className="flex items-center space-x-6">
        <button 
          onClick={toggleMenu} 
          className="relative z-[150] w-10 h-10 flex items-center justify-center focus:outline-none"
        >
          <div className="relative flex items-center justify-center">
            <X 
              size={32} 
              className={`absolute text-white transition-all duration-300 transform ${isOpen ? "rotate-0 opacity-100 scale-100" : "rotate-90 opacity-0 scale-50"}`} 
            />
            <Menu 
              size={32} 
              className={`absolute text-[#3E4A3D] transition-all duration-300 transform ${isOpen ? "-rotate-90 opacity-0 scale-50" : "rotate-0 opacity-100 scale-100"}`} 
            />
          </div>
        </button>

        <div className="text-2xl font-bold text-[#3E4A3D] tracking-tight">
          <Link to="/home" className="hover:opacity-80 transition-opacity">
            Crop<span className="italic font-medium"> Compass</span>
          </Link>
        </div>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center space-x-8">
        <Link to="/myorders" className="text-[#3E4A3D] hover:text-[#4F6D46] transition-all"><ListOrdered size={24} /></Link>
        <Link to="/profile" className="text-[#3E4A3D] hover:text-[#4F6D46] transition-all"><User size={24} /></Link>
        <Link to="/cart" className="relative text-[#3E4A3D] hover:text-[#4F6D46] transition-all">
          <ShoppingCart size={24} />
          {noOfItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#3E4A3D] text-[#D9E9CF] rounded-full text-[10px] font-bold w-5 h-5 flex items-center justify-center">
              {noOfItems}
            </span>
          )}
        </Link>
      </div>

      {/* --- FULL SCREEN MENU --- */}
      <div 
        className={`fixed inset-0 w-full h-screen z-[110] transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-400 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          backgroundImage: "url('/image-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          clipPath: isOpen 
            ? "circle(150% at 60px 40px)" 
            : "circle(0% at 60px 40px)",
          WebkitClipPath: isOpen 
            ? "circle(150% at 60px 40px)" 
            : "circle(0% at 60px 40px)",
        }}
      >
        {/* Dark Shadow Overlay */}
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[3px]"></div>

        <div className="relative h-full flex flex-col items-center justify-center px-4">
          <ul className="flex flex-col items-center space-y-10 w-full">
            
            {/* SHOP - Store Icon */}
            <li className={`w-full flex justify-center transition-all duration-400 delay-150 transform ${isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
              <Link to="/home" onClick={() => setIsOpen(false)} className={menuLinkStyles}>
                <Store size={48} className="group-hover:scale-110 transition-transform" />
                <span>Shop</span>
              </Link>
            </li>

          <li className={`w-full flex justify-center transition-all duration-400 delay-200 transform ${isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
  <a
    href="http://127.0.0.1:5001" // ← Flask ML URL
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => setIsOpen(false)}
    className={menuLinkStyles}
  >
    <Sprout size={48} className="group-hover:scale-110 transition-transform" />
    <span>Crop recommendation</span>
  </a>
</li>

            {/* FERTILIZER RECOMMENDATION - SprayCan Icon */}
            <li className={`w-full flex justify-center transition-all duration-400 delay-250 transform ${isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
              <Link to="/fertilizer-recommendation" onClick={() => setIsOpen(false)} className={menuLinkStyles}>
                <SprayCan size={48} className="group-hover:scale-110 transition-transform" />
                <span>Fertilizer calculation</span>
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;