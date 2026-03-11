import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Home,
  Navigation,
  CreditCard,
  AlertCircle,
  ArrowLeft,
  Phone,
  Loader2,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { cityData } from "../data/geoCities";
import FormInput from "../components/FormInput";

const ShippingForm = () => {
  const { t, currentLang } = useLanguage();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: "",
    city: "",
    street: "",
    houseNumber: "",
    zipCode: "",
    additionalInfo: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formatPhoneNumber = (val) => {
    const num = val.replace(/\D/g, "");
    if (!num.startsWith("995")) return val.startsWith("+") ? val : "+" + val;
    const p = [
      num.slice(0, 3),
      num.slice(3, 6),
      num.slice(6, 8),
      num.slice(8, 10),
      num.slice(10, 12),
    ];
    return `+${p[0]}${p[1] ? " " + p[1] : ""}${p[2] ? " " + p[2] : ""}${p[3] ? " " + p[3] : ""}${p[4] ? " " + p[4] : ""}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updates = { [name]: value };

    if (name === "phone") {
      updates.phone = formatPhoneNumber(value.replace(/[^\d+ ]/g, "")).slice(
        0,
        17,
      );
    } else if (name === "city") {
      const match = cityData.find((c) => c.ka === value || c.en === value);
      if (match) updates.zipCode = match.zip;
    } else if (name === "zipCode") {
      const zip = value.replace(/[^0-9]/g, "").slice(0, 4);
      updates.zipCode = zip;
      if (zip.length === 4) {
        const match = cityData.find((c) => c.zip === zip);
        if (match) updates.city = currentLang === "en" ? match.en : match.ka;
      }
    }

    setFormData((prev) => ({ ...prev, ...updates }));
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.phone ||
      !formData.city ||
      !formData.street ||
      !formData.houseNumber
    ) {
      setError(t.errorRequired);
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem("shippingAddress", JSON.stringify(formData));
      navigate("/checkout");
    }, 1500);
  };

  return (
    <div className="w-full max-w-lg mx-auto py-12 px-4 min-h-screen">
      <button
        onClick={() => navigate("/cart")}
        className="flex items-center gap-2 mb-10 opacity-50 hover:opacity-100 transition-all text-[10px] font-black uppercase tracking-widest"
        style={{ color: "var(--color-text-primary)" }}>
        <ArrowLeft size={14} /> {t.backToCart}
      </button>

      <motion.div
        animate={error ? { x: [0, -10, 10, -10, 10, 0] } : { opacity: 1 }}
        className="w-full border rounded-card p-8 sm:p-12 shadow-2xl"
        style={{
          backgroundColor: "var(--color-bg-card)",
          borderColor: "var(--color-border-main)",
        }}>
        <form onSubmit={handleSubmit} className="space-y-7">
          <FormInput
            icon={Phone}
            label={t.phone}
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            type="tel"
            onFocus={() =>
              !formData.phone && setFormData({ ...formData, phone: "+995 " })
            }
          />

          <FormInput
            icon={MapPin}
            label={t.cityLabel}
            name="city"
            value={formData.city}
            onChange={handleChange}
            list="geo-cities"
          />
          <datalist id="geo-cities">
            {cityData.map((c, i) => (
              <option key={i} value={currentLang === "en" ? c.en : c.ka} />
            ))}
          </datalist>

          <FormInput
            icon={Navigation}
            label={t.streetLabel}
            name="street"
            value={formData.street}
            onChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-10">
            <FormInput
              icon={Home}
              label={t.houseLabel}
              name="houseNumber"
              value={formData.houseNumber}
              onChange={handleChange}
            />
            <FormInput
              label={t.zipLabel}
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              inputMode="numeric"
            />
          </div>

          <div className="relative pt-4">
            <textarea
              name="additionalInfo"
              className="w-full bg-transparent border-b py-4 outline-none focus:border-indigo-500 transition-all peer min-h-15 resize-none font-medium"
              style={{
                color: "var(--color-text-primary)",
                borderColor: "var(--color-border-main)",
              }}
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder=" "
            />
            <label
              className="absolute left-0 top-8 opacity-30 text-[10px] uppercase font-bold tracking-widest peer-focus:top-0 peer-[:not(:placeholder-shown)]:top-0 transition-all"
              style={{ color: "var(--color-text-primary)" }}>
              {t.noteLabel}
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#5245ff] hover:bg-[#6358ff] text-white py-6 rounded-3xl font-black text-[11px] uppercase tracking-widest transition-all flex items-center justify-center gap-4">
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>
                {t.proceedToPayment} <CreditCard size={18} />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ShippingForm;
