import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type Gif from "../types/gif";
import { giphyService } from "../services/giphyService";
import { RatingEnum } from "../types/rating";

interface GifContextType {
  gifs: Gif[];
  loading: boolean;
  query: string;
  page: number;
  size: number;
  rating: RatingEnum;
  error: string | null;
  setQuery(query: string): void;
  setPage: (page: number | ((prev: number) => number)) => void;
  setSize(size: number): void;
  load(): Promise<void>;
  setGifs(gifs: Gif[]): void;
  setLoading(loading: boolean): void;
  setRating(rating: RatingEnum): void;
  setError(error: string): void;
}

const GifContext = createContext<GifContextType>(null!);

export const useGif = () => useContext(GifContext);

export const GifProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(12);
  const [rating, setRating] = useState<RatingEnum>(RatingEnum.ALL);
  const [error, setError] = useState<string | null>(null);
  const load = async () => {
    setLoading(true);
    try {
      const data = query
        ? await giphyService.searchGifs(query, page, size, rating)
        : await giphyService.getTrending(page, size);
      setGifs(data);
    }catch (e: any) {
      console.error(e);
      setError(e.message || 'Failed to load GIFs');
    }
     finally {
      setLoading(false);
    }
  };

  return (
    <GifContext.Provider
      value={{
        gifs,
        loading,
        query,
        page,
        size,
        rating,
        error,
        setQuery,
        setPage,
        setSize,
        load,
        setGifs,
        setLoading,
        setRating,
        setError
      }}
    >
      {children}
    </GifContext.Provider>
  );
};
