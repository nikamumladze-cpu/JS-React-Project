import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import {
  Facebook,
  Instagram,
  Github,
  Mail,
  Phone,
  MapPin,
  Cpu,
} from "lucide-react"; 
import geoLabLogo from "../imgs/GeoLab-Logo.png";

const Foot = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const styles = {
    bg: "var(--color-bg-card, #111827)",
    text: "var(--color-text-primary, #ffffff)",
    border: "var(--color-border-main, #374151)",
    input: "var(--color-bg-input, #1f2937)",
  };

  return (
    <footer
      className="w-full border-t py-14 px-6 mt-auto transition-all"
      style={{
        backgroundColor: styles.bg,
        borderColor: styles.border,
        color: styles.text,
      }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        <div className="flex flex-col gap-6">
          <Link to="/" className="flex items-center gap-3 group shrink-0 w-fit">
            <div className="bg-indigo-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-indigo-500/20">
              <Cpu className="text-white size-6" />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-3xl font-black tracking-tighter text-indigo-500 italic uppercase leading-none">
                TECH
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 px-0.5">
                Store
              </span>
            </div>
          </Link>

          <p className="opacity-50 text-xs font-medium leading-relaxed max-w-xs">
            {t.footerDesc ||
              "საუკეთესო ხარისხის პროდუქცია და სწრაფი მიწოდება მთელი საქართველოს მასშტაბით."}
          </p>

          <div className="flex gap-4 pt-2">
            {[Facebook, Instagram, Github].map((Icon, idx) => (
              <Icon
                key={idx}
                className="opacity-40 hover:opacity-100 hover:text-indigo-500 cursor-pointer transition-all hover:-translate-y-1"
                size={22}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-row justify-between items-start gap-4">
          <div className="flex flex-col gap-5">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500 italic">
              {t.contact || "კონტაქტი"}
            </h4>
            <div className="flex flex-col gap-4 text-sm opacity-60 font-bold">
              <span className="flex items-center gap-3 hover:text-indigo-500 transition-colors cursor-default">
                <MapPin size={16} className="text-indigo-600" /> Tbilisi,
                Georgia
              </span>
              <span className="flex items-center gap-3 hover:text-indigo-500 transition-colors cursor-default">
                <Phone size={16} className="text-indigo-600" /> +995 555 00 00
                00
              </span>
              <span className="flex items-center gap-3 hover:text-indigo-500 transition-colors cursor-default">
                <Mail size={16} className="text-indigo-600" /> info@store.ge
              </span>
            </div>
          </div>

          <div className="shrink-0 pt-1">
            <a
              href="https://geolab.edu.ge/"
              target="_blank"
              rel="noreferrer"
              className="block hover:opacity-80 transition-opacity">
              <img
                src={geoLabLogo}
                alt="GeoLab Logo"
                className="w-24 md:w-28 object-contain"
              />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500 italic">
            Newsletter
          </h4>
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email address..."
              className="p-4 rounded-2xl border-2 border-transparent focus:border-indigo-500/50 outline-none text-sm font-bold transition-all placeholder:opacity-30"
              style={{ backgroundColor: styles.input, color: styles.text }}
            />
            <button className="bg-indigo-600 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-indigo-700 transition-all active:scale-95 shadow-xl shadow-indigo-500/20 cursor-pointer">
              {t.subscribe || "გამოწერა"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-20">
          © {currentYear} Store Project. Built by Nika.
        </p>
      </div>
    </footer>
  );
};

export default Foot;
