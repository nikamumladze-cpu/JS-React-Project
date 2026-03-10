import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  Lock,
  LogIn,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import "../App.css";

const Login = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState("email");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [serverError, setServerError] = useState("");

  const schema = yup.lazy(() =>
    yup.object({
      contact:
        loginMethod === "email"
          ? yup
              .string()
              .email(t.errorEmailInvalid || "Invalid Email")
              .required(t.errorEmailRequired || "Required")
          : yup
              .string()
              .min(9, t.errorPhoneInvalid || "Invalid Phone")
              .required(t.errorPhoneRequired || "Required"),
      password: yup
        .string()
        .min(6, t.errorPassShort || "Short")
        .required(t.errorPassRequired || "Required"),
    }),
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleMethodChange = (method) => {
    setLoginMethod(method);
    setServerError("");
    reset();
  };

  const onSubmit = (data) => {
    setServerError("");
    const registeredUser = localStorage.getItem("registeredContact");
    const registeredPass = localStorage.getItem("registeredPassword");

    if (data.contact !== registeredUser) {
      setServerError(
        lang === "ka"
          ? "ანგარიში არ არის რეგისტრირებული"
          : "Account not registered",
      );
      return;
    }

    if (data.password !== registeredPass) {
      setServerError(lang === "ka" ? "პაროლი არასწორია" : "Incorrect password");
      return;
    }

    localStorage.setItem("username", data.contact);
    window.location.href = "/";
  };

  return (
    <div className="auth-card balanced-mode">
      <div className="text-center mb-8">
        <h2
          className="text-3xl font-black uppercase italic tracking-tighter auth-title"
          style={{ color: "var(--color-text-primary)" }}>
          {t.authTitle}
        </h2>
        <div className="h-1.5 w-12 bg-indigo-600 mx-auto mt-2 rounded-full opacity-80"></div>
      </div>

      <div className="auth-switcher-balanced mb-8">
        {["email", "phone"].map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => handleMethodChange(m)}
            className={`switch-btn-md ${loginMethod === m ? "active" : ""}`}>
            {m === "email" ? <Mail size={14} /> : <Phone size={14} />}
            <span className="ml-2 uppercase tracking-widest text-[10px] font-bold">
              {m === "email" ? t.email : t.phone}
            </span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <AnimatePresence>
          {serverError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-[11px] font-bold uppercase tracking-wider">
              <AlertCircle size={16} />
              {serverError}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="input-container">
          <div className="relative">
            <div className="icon-box">
              {loginMethod === "email" ? (
                <Mail size={18} />
              ) : (
                <Phone size={18} />
              )}
            </div>
            <input
              {...register("contact")}
              className={`balanced-input ${errors.contact || serverError ? "input-error" : ""}`}
              placeholder=" "
            />
            <label className="balanced-float">
              {loginMethod === "email" ? t.email : t.phone}
            </label>
          </div>
          {errors.contact && (
            <span className="text-[10px] text-red-500 mt-1 ml-1">
              {errors.contact.message}
            </span>
          )}
        </div>

        <div className="input-container">
          <div className="relative">
            <div className="icon-box">
              <Lock size={18} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className={`balanced-input ${errors.password || serverError ? "input-error" : ""}`}
              placeholder=" "
            />
            <label className="balanced-float">{t.password}</label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 opacity-40 hover:opacity-100 transition-opacity">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <span className="text-[10px] text-red-500 mt-1 ml-1">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="extra-options flex items-center justify-between">
          <label
            className="checkbox-wrap group flex items-center gap-2 cursor-pointer"
            onClick={() => setRememberMe(!rememberMe)}>
            <div
              className={`custom-check-md transition-all ${rememberMe ? "checked bg-indigo-600" : "border-2 border-gray-500/30"}`}>
              {rememberMe && (
                <Check size={12} strokeWidth={4} className="text-white" />
              )}
            </div>
            <span
              className="text-[11px] font-black uppercase tracking-tighter opacity-60"
              style={{ color: "var(--color-text-primary)" }}>
              {lang === "ka" ? "დამიმახსოვრე" : "Remember Me"}
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="submit-btn-balanced group transition-all active:scale-95">
          <div className="flex items-center justify-center gap-3">
            <LogIn size={20} strokeWidth={3} />
            <span className="tracking-widest uppercase font-black">
              {t.loginBtn}
            </span>
          </div>
        </button>

        <div className="text-center mt-10 pt-6 border-t border-(--color-border-main)] opacity-80">
          <p
            className="text-[10px] font-black uppercase tracking-[0.15em]"
            style={{ color: "var(--color-text-primary)" }}>
            {t.noAccount}{" "}
            <Link
              to="/registration"
              className="ml-2 text-indigo-500 border-b-2 border-indigo-500/20 pb-0.5">
              {t.navReg}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
