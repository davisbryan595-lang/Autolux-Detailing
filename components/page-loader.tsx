export default function PageLoader() {
  return (
    <div className="fixed inset-0 bg-background z-[9999] flex items-center justify-center">
      <div className="relative w-24 h-24">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 border-4 border-transparent border-t-primary border-r-primary rounded-full animate-spin"></div>

        {/* Middle rotating ring */}
        <div
          className="absolute inset-2 border-4 border-transparent border-b-primary border-l-primary rounded-full animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
        ></div>

        {/* Inner circle */}
        <div className="absolute inset-4 bg-primary/20 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-primary font-bold text-sm">AL</span>
        </div>
      </div>

      {/* Loading text */}
      <div className="absolute bottom-20 text-center">
        <p className="text-primary font-semibold">Loading...</p>
      </div>
    </div>
  )
}
