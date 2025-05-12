// src/pages/GifExplorer.tsx
import React, { useEffect } from "react";
import { useGif } from "../context/GifContext";
import { GifGrid } from "../components/GifGrid";
import { Spinner } from "../components/commun/Spinner";
import { Pagination } from "../components/commun/Pagination";
import { ErrorMessage } from "../components/commun/ErrorPage";
import { NavBar } from "../components/layout/NavBar";

export const GifExplorer: React.FC = () => {
  const {
    gifs,
    loading,
    page,
    size,
    error,
    setPage,
    setSize,
    load
  } = useGif();

  useEffect(() => {
    load();
  }, [page, size]);

  const renderContent = () => {
    if (error) return <ErrorMessage message={error} />;
    if (loading) return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
    return <GifGrid gifs={gifs} />;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar/>
      <main className="flex-1 pt-20 pb-20 px-4 container mx-auto">
        {renderContent()}
      </main>

      <footer className="fixed bottom-0 inset-x-0 bg-white shadow-inner p-4 flex justify-center z-40">
        <Pagination
          page={page}
          size={size}
          onPrev={() => setPage((p) => Math.max(1, p - 1))}
          onNext={() => setPage((p) => p + 1)}
          onSizeChange={(newSize) => {
            setSize(newSize);
            setPage(1);
          }}
        />
      </footer>
    </div>
  );
};
