// src/components/GifGrid.tsx
import React from "react";
import Gif from "../types/gif";
import { GifCard } from "./GifCard";

export const GifGrid: React.FC<{ gifs: Gif[] }> = ({ gifs }) => (
  <div className="flex flex-wrap -mx-4"  >
    {gifs.map(g => <GifCard key={g.id} gif={g} />)}
  </div>
);
