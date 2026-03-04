import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  Phone,
  CheckCircle2,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import "../App.css";

const Registration = () => {
  const { t } = useLanguage();
  const [regMethod, setRegMethod] = useState("email");
  const [agreed, setAgreed] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) return setError(t.errorAgreed);
    if (formData.password !== formData.confirmPassword)
      return setError(t.errorMatch);

    navigate("/login");
  };

  return (
    <div className="auth-card balanced-mode">
      <div className="text-center mb-8">
        <h2
          className="text-3xl font-black uppercase italic tracking-tighter auth-title"
          style={{ color: "var(--color-text-primary)" }}>
          {t.regTitle}
        </h2>
        <div className="h-1.5 w-12 bg-indigo-600 mx-auto mt-2 rounded-full opacity-80"></div>
      </div>

      <div className="auth-switcher-balanced mb-8">
        {["email", "phone"].map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setRegMethod(m);
              setError("");
            }}
            className={`switch-btn-md ${regMethod === m ? "active" : ""}`}>
            {m === "email" ? <Mail size={14} /> : <Phone size={14} />}
            <span className="ml-2 uppercase tracking-widest text-[10px] font-bold">
              {m === "email" ? t.email : t.phone}
            </span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="input-container">
          <div className="relative">
            <div className="icon-box">
              <User size={18} />
            </div>
            <input
              type="text"
              className="balanced-input"
              placeholder=" "
              required
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            <label className="balanced-float">{t.fullName}</label>
          </div>
        </div>

        <div className="input-container">
          <div className="relative">
            <div className="icon-box">
              {regMethod === "email" ? <Mail size={18} /> : <Phone size={18} />}
            </div>
            <input
              type={regMethod === "email" ? "email" : "tel"}
              className="balanced-input"
              placeholder=" "
              required
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
            />
            <label className="balanced-float">
              {regMethod === "email" ? t.email : t.phone}
            </label>
          </div>
        </div>

        <div className="input-container">
          <div className="relative">
            <div className="icon-box">
              <Lock size={18} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              className="balanced-input pr-12"
              placeholder=" "
              required
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <label className="balanced-float">{t.password}</label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 opacity-40 hover:opacity-100 transition-opacity cursor-pointer border-none bg-transparent">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="input-container">
          <div className="relative">
            <div className="icon-box">
              <CheckCircle2 size={18} />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="balanced-input pr-12"
              placeholder=" "
              required
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
            <label className="balanced-float">{t.confirmPass}</label>
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 opacity-40 hover:opacity-100 transition-opacity cursor-pointer border-none bg-transparent">
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="extra-options mt-2">
          <label
            className="checkbox-wrap group flex items-center gap-3 cursor-pointer"
            onClick={() => setAgreed(!agreed)}>
            <div
              className={`custom-check-md transition-all ${
                agreed ? "checked bg-indigo-600" : "border-2 border-gray-500/30"
              }`}>
              {agreed && (
                <Check size={12} strokeWidth={4} className="text-white" />
              )}
            </div>
            <span
              className="text-[11px] font-black uppercase tracking-tighter opacity-60 group-hover:opacity-100 transition-opacity"
              style={{ color: "var(--color-text-primary)" }}>
              {t.agree}
            </span>
          </label>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-center gap-2 text-red-500 bg-red-500/10 py-3 rounded-xl border border-red-500/20">
              <AlertCircle size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                {error}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="submit"
          className="submit-btn-balanced group relative overflow-hidden transition-all active:scale-95">
          <div className="flex items-center justify-center gap-3 relative z-10">
            <UserPlus
              size={20}
              strokeWidth={3}
              className="group-hover:rotate-12 transition-transform"
            />
            <span className="tracking-widest">{t.regBtn}</span>
          </div>
        </button>

        <div className="text-center mt-10 pt-6 border-t border-(--color-border-main)] opacity-80">
          <p
            className="text-[10px] font-black uppercase tracking-[0.15em]"
            style={{ color: "var(--color-text-primary)" }}>
            {t.haveAccount}{" "}
            <Link
              to="/login"
              className="ml-2 text-indigo-500 hover:text-indigo-400 transition-all border-b-2 border-indigo-500/20 hover:border-indigo-500 pb-0.5">
              {t.loginBtn}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Registration;
