// components/Spinner.tsx
import React from "react";

export const Spinner: React.FC = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white">
    <div
      className="
        w-12 h-12
        border-4 border-gray-300
        border-t-gray-800
        rounded-full
        animate-spin
      "
    />
  </div>
);
