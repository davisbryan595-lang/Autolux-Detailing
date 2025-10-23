"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      >
        <Image
          src="/logo.png"
          alt="Loading..."
          width={100}
          height={100}
          className="rounded-full"
        />
      </motion.div>
    </div>
  );
}
