export default function BaseLoader({ className = "", overlay = true }) {
  return (
    <div
      className={`flex items-center justify-center z-50 ${
        overlay ? "absolute inset-0 bg-white/80 rounded-xl" : ""
      } ${className}`}
    >
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
