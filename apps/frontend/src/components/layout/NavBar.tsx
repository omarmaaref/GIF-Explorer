// components/NavBar.tsx
import React from "react";
import { SearchBar } from "./SearchBar";


export const NavBar: React.FC = () => (
  <nav className="fixed top-0 inset-x-0 bg-white shadow z-30">
    <div className="container mx-auto flex items-center justify-between px-4 py-3">
      <div>
        <h1 className="text-xl font-bold text-gray-800">GIF Explorer</h1>
      </div>

      <div className="w-full max-w-md">
        <SearchBar/>
      </div>
    </div>
  </nav>
);
