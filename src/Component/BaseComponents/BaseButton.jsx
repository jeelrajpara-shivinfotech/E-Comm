import { ArrowRight } from "../../assets/svg";

export default function BaseButton({
  children,
  bgColor = "bg-black",
  textColor = "text-white",
  icon = true,
  iconPosition = "right",
  customIcon = null,
  className = "",
  onClick,
  ...props
}) {
  const defaultArrow = (
    <ArrowRight />
  );

  const iconElement = customIcon ? customIcon : icon ? defaultArrow : null;

  return (
    <button
      onClick={onClick}
      type="submit"
      {...props}
      className={`px-4 py-2 cursor-pointer rounded-md flex items-center justify-center gap-2 lexend hover:opacity-90 transition ${bgColor} ${textColor} ${className}`}
    >
      {iconPosition === "left" && iconElement}
      {children}
      {iconPosition === "right" && iconElement}
    </button>
  );
}
