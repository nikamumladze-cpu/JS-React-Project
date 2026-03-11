import React from "react";

const FormInput = ({ icon: Icon, label, name, value, onChange, list, ...props }) => (
  <div className="relative group">
    {Icon && (
      <Icon 
        className="absolute left-0 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:text-indigo-500 transition-all" 
        size={18} 
        style={{ color: "var(--color-text-primary)" }} 
      />
    )}
    <input
      name={name}
      value={value}
      onChange={onChange}
      list={list}
      placeholder=" "
      className={`w-full bg-transparent border-b py-4 ${Icon ? 'pl-10' : 'px-2'} pr-4 outline-none focus:border-indigo-500 transition-all peer font-medium`}
      style={{ color: "var(--color-text-primary)", borderColor: "var(--color-border-main)" }}
      {...props}
    />
    <label 
      className={`absolute ${Icon ? 'left-10' : 'left-2'} top-4 opacity-30 text-sm transition-all peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-indigo-500 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-[10px] uppercase font-bold tracking-widest`}
      style={{ color: "var(--color-text-primary)" }}
    >
      {label}
    </label>
  </div>
);

export default FormInput;