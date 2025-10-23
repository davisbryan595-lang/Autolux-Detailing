"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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
          {/* Moving Logo */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Image
              src="/logo.png" // <-- your logo path
              alt="AutoLux Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
          </motion.div>
        </div>
      </div>

      {/* Loading text */}
      <div className="absolute bottom-20 text-center">
        <p className="text-primary font-semibold tracking-wide animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
