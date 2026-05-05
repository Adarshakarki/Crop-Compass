import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck } from "lucide-react";

function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [transactionUuid, setTransactionUuid] = useState("");
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");

  const amount = Number(state?.totalAmount) || 0;
  const taxAmount = 10;
  const serviceCharge = 0;
  const deliveryCharge = 0;
  const totalAmount = amount + taxAmount + serviceCharge + deliveryCharge;

  const signedFieldNames = "total_amount,transaction_uuid,product_code";

  useEffect(() => {
    if (isNaN(amount) || amount <= 0) {
      setError("Invalid amount. Please return to your cart.");
      return;
    }

    const uuid = uuidv4();
    setTransactionUuid(uuid);

    // eSewa signature logic
    const message = `total_amount=${totalAmount},transaction_uuid=${uuid},product_code=EPAYTEST`;
    const hash = CryptoJS.HmacSHA256(message, "8gBm/:&EnhH.1/q");
    const hashBase64 = CryptoJS.enc.Base64.stringify(hash);
    setSignature(hashBase64);
  }, [amount, totalAmount]);

  if (error) {
    return (
      <div className="w-full h-screen bg-[#DBE3D5] flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
          <p className="text-red-500 font-bold mb-4">{error}</p>
          <button onClick={() => navigate(-1)} className="text-[#3E4A3D] underline">Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-[#DBE3D5] flex items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[1000px] h-[75vh] bg-[#F5F7F2] rounded-3xl shadow-2xl overflow-hidden flex border border-white/40 relative"
      >
        {/* BACK BUTTON */}
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-8 left-8 flex items-center gap-2 text-[#8FA189] font-bold text-xs uppercase tracking-widest hover:text-[#3E4A3D] transition-colors z-20"
        >
          <ArrowLeft size={16} /> Cancel
        </button>

        {/* LEFT SECTION: BRANDING IMAGE */}
        <div className="w-1/2 h-full hidden md:block p-8">
          <div className="w-full h-full border border-[#8FA189]/20 rounded-2xl overflow-hidden relative">
            <img 
              src="/receipt.jpg" // Use your receipt/shop/money tree image here
              alt="Secure Payment" 
              className="w-full h-full object-cover grayscale-[20%]" 
            />
            <div className="absolute inset-0 bg-[#3E4A3D]/10 mix-blend-multiply"></div>
          </div>
        </div>

        {/* RIGHT SECTION: PAYMENT FORM */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-12 bg-[#F5F7F2]">
          <div className="max-w-sm mx-auto w-full">
            <div className="flex items-center gap-2 mb-2">
               <ShieldCheck size={18} className="text-[#8FA189]" />
               <span className="text-[10px] text-[#8FA189] font-black uppercase tracking-[0.2em]">Secure Checkout</span>
            </div>
            
            <h1 className="text-5xl font-semibold text-[#3E4A3D] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Payment <span className="italic text-[#8FA189]">Details</span>
            </h1>

            {/* BILLING SUMMARY */}
            <div className="bg-white border border-[#8FA189]/20 rounded-2xl p-6 mb-8 space-y-3 shadow-sm">
                <div className="flex justify-between text-xs text-[#8FA189] uppercase tracking-wider font-bold">
                    <span>Subtotal</span>
                    <span>NPR {amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-[#8FA189] uppercase tracking-wider font-bold border-b border-dashed border-[#8FA189]/30 pb-3">
                    <span>Tax (VAT)</span>
                    <span>NPR {taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg text-[#3E4A3D] font-bold pt-1">
                    <span>Total</span>
                    <span>NPR {totalAmount.toFixed(2)}</span>
                </div>
            </div>

            <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
              {/* HIDDEN INPUTS */}
              <input type="hidden" name="amount" value={amount} />
              <input type="hidden" name="tax_amount" value={taxAmount} />
              <input type="hidden" name="product_service_charge" value={serviceCharge} />
              <input type="hidden" name="product_delivery_charge" value={deliveryCharge} />
              <input type="hidden" name="total_amount" value={totalAmount} />
              <input type="hidden" name="transaction_uuid" value={transactionUuid} />
              <input type="hidden" name="product_code" value="EPAYTEST" />
              <input type="hidden" name="success_url" value="http://localhost:5173/success" />
              <input type="hidden" name="failure_url" value="http://localhost:5173/failure" />
              <input type="hidden" name="signed_field_names" value={signedFieldNames} />
              <input type="hidden" name="signature" value={signature} />

              <button 
                type="submit" 
                className="w-full bg-[#3E4A3D] text-[#F5F7F2] py-4 rounded-xl font-bold uppercase text-[11px] tracking-[0.2em] shadow-xl hover:bg-[#8FA189] transition-all flex items-center justify-center gap-3 group"
              >
                Pay via eSewa 
                <div className="w-1 h-1 rounded-full bg-white/40 group-hover:w-4 transition-all"></div>
              </button>
            </form>
            
            <p className="mt-6 text-[9px] text-center text-[#8FA189] uppercase tracking-widest leading-relaxed">
              By clicking pay, you agree to our <br/> digital trade terms and conditions.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Payment;