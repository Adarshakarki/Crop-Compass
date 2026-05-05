import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { ArrowLeft } from "lucide-react";
import { useSetRecoilState } from 'recoil';
import { userRole } from '../store/atom';

function Loginasseller() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const setUserRole = useSetRecoilState(userRole);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            toast.error("Please fill in all fields.");
            return;
        }
        try {
            const response = await axios.post("/api/v1/seller/login", formData);
            if (response.status === 200) {
                toast.success("Login successful!");
                setUserRole(response.data.role);
                setTimeout(() => navigate("/dashboard"), 2000);
            }
        } catch (error) {
            const message = error.response?.data?.message || "Login failed.";
            toast.error(message);
        }
    };

    return (
        <div className="w-full h-screen bg-[#dbe3d5] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-5xl bg-[#F5F7F2] rounded-3xl shadow-2xl flex overflow-hidden border border-white/50" style={{ height: '75vh' }}>
                <div className="w-full md:w-1/2 p-12 flex flex-col justify-center relative">
                    {/* BACK BUTTON */}
                    <button onClick={() => navigate(-1)} className="absolute top-8 left-8 flex items-center gap-2 text-[#8FA189] font-bold text-xs uppercase tracking-widest hover:text-[#3E4A3D] transition-colors">
                        <ArrowLeft size={16} /> Back
                    </button>

                    <div className="max-w-sm mx-auto w-full">
                        <h1 className="text-5xl font-semibold text-[#3E4A3D] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Seller <span className="italic text-[#8FA189]">Login</span></h1>
                        <p className="text-[#8FA189] text-[10px] uppercase font-black tracking-[0.3em] mb-10">Precision AI Dashboard</p>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full px-5 py-4 bg-white border border-[#8FA189]/20 rounded-2xl outline-none" />
                            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full px-5 py-4 bg-white border border-[#8FA189]/20 rounded-2xl outline-none" />
                            <button type="submit" className="w-full bg-[#3E4A3D] text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-[#8FA189] transition-all">Sign In</button>
                        </form>
                    </div>
                </div>
                <div className="hidden md:block w-1/2 p-8"><img src="/seller.jpg" className="w-full h-full object-cover rounded-2xl" alt="Login" /></div>
            </motion.div>
            <ToastContainer />
        </div>
    );
}
export default Loginasseller;