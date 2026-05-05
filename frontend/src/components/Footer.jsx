function Footer() {
  return (
    <footer className="w-full bg-[#dbe3d5] py-12 px-10 border-t border-[#8FA189]/20">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* BRANDING WITH LOGO.PNG */}
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
          <p className="text-2xl font-bold text-[#3E4A3D] tracking-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Crop Compass
          </p>
        </div>

        {/* TAGLINES */}
        <div className="flex items-center gap-8">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8FA189] font-sans">
            Precision Agriculture
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#3E4A3D]/40 font-sans">
            ML Quality Verified
          </span>
        </div>

        <p className="text-[10px] text-gray-400 font-sans uppercase tracking-widest">
          © 2025 All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;