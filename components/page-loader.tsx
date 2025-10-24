"use client";

import Image from "next/image";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 bg-background z-[9999] flex flex-col items-center justify-center">
      {/* Rotating logo */}
      <div className="w-24 h-24 animate-spin-slow">
        <Image
          src="/logo.png"
          alt="Logo"
          width={96}
          height={96}
          className="rounded-full"
        />
      </div>

      {/* Loading text */}
      <p className="text-primary font-semibold mt-6">Loading...</p>
    </div>
  );
}
