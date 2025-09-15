import React from "react";
import "./index.css";
import * as Lucide from "lucide-react";

/**
 * Button – gradient variants, icon trái/phải, loading, fullWidth.
 * props:
 *  - variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'outline' | 'ghost'
 *  - size: 'small' | 'medium' | 'large' | 'xl'
 *  - icon: 'Check', 'Trash2', custom Lucide name, or React component
 *  - iconPosition: 'left' | 'right'
 */
const Button = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  type = "button",
  variant = "primary",
  size = "medium",
  className = "",
  icon,
  iconPosition = "left",
  fullWidth = false,
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-opacity-50 select-none relative overflow-hidden";
  const hoverFx =
    "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/10 before:to-white/0 before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700";

  const variants = {
    primary:
      "bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white focus:ring-blue-300 hover:brightness-105",
    secondary:
      "bg-gradient-to-r from-slate-100 via-slate-200 to-slate-300 text-slate-800 focus:ring-slate-300 border border-slate-300",
    success:
      "bg-gradient-to-r from-lime-400 via-green-500 to-emerald-600 text-white focus:ring-green-300",
    danger:
      "bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 text-white focus:ring-red-300",
    warning:
      "bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-500 text-white focus:ring-amber-300",
    outline:
      "border-2 border-blue-500 text-blue-600 bg-transparent hover:bg-blue-50 focus:ring-blue-300",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300",
  };

  const sizes = {
    small: "px-3 py-1.5 text-sm gap-1.5 min-h-[34px]",
    medium: "px-4 py-2.5 text-base gap-2 min-h-[42px]",
    large: "px-5 py-3 text-lg gap-2.5 min-h-[50px]",
    xl: "px-6 py-3.5 text-xl gap-3 min-h-[58px]",
  };

  const iconSizes = {
    small: "w-4 h-4",
    medium: "w-5 h-5",
    large: "w-6 h-6",
    xl: "w-7 h-7",
  };

  const resolveIcon = (value) => {
    if (!value) return null;
    if (typeof value === "string" && Lucide[value]) return Lucide[value];
    if (typeof value === "function") return value;
    return null;
  };

  const Icon = resolveIcon(icon);
  const Spinner = Lucide.RefreshCw;

  const classes = [
    base,
    hoverFx,
    variants[variant] || variants.primary,
    sizes[size],
    fullWidth ? "w-full" : "",
    disabled || loading ? "opacity-60 cursor-not-allowed" : "hover:scale-[1.02]",
    className,
  ]
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <button
      type={type}
      className={classes}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Spinner className={`${iconSizes[size]} animate-spin`} />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === "left" && <Icon className={iconSizes[size]} />}
          {children}
          {Icon && iconPosition === "right" && <Icon className={iconSizes[size]} />}
        </>
      )}
    </button>
  );
};

export default Button;
