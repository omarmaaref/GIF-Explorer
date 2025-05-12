// components/SearchBar.tsx
import React from 'react';
import { RatingEnum, ratingLabels } from '../types/rating';
import { useGif } from '../context/GifContext';

export const SearchBar: React.FC = () => {
  const ratingValues = Object
  .values(RatingEnum)
  .filter(v => typeof v === 'number') as RatingEnum[];

    const {
      query,
      rating,
      setQuery,
      setRating,
      load,
    } = useGif();
  return (
  <form
    onSubmit={e => {
      e.preventDefault();
      load();
    }}
    className="flex items-center w-full max-w-lg mx-auto space-x-2"
  >
    <input
      type="text"
      placeholder="Search GIFs..."
      value={query}
      onChange={e => setQuery(e.target.value)}
      className="
        flex-1
        px-4 py-2
        border border-gray-300
        rounded-l-md
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        placeholder-gray-500
      "
    />
    <select
      value={rating}
      onChange={e => setRating(Number(e.target.value) as RatingEnum)}
      className="
        w-[80px] px-3 py-2
        border border-gray-300
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
      "
    >
      {ratingValues.map(r => (
        <option key={r} value={r}>
          {ratingLabels[r]}
        </option>
      ))}
    </select>

    <button
      type="submit"
      className="
        px-4 py-2
        bg-blue-600 text-white font-medium
        rounded-r-md
        hover:bg-blue-700
        focus:outline-none focus:ring-2 focus:ring-blue-500
      "
    >
      Search
    </button>
  </form>)
};
