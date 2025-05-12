import Gif from "../types/gif";

export const GifCard: React.FC<{ gif: Gif }> = ({ gif }) => (
    <div
      key={gif.id}
      className="px-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-8">
      <div className="bg-white rounded-lg overflow-hidden shadow-md">
        <div className="aspect-w-1 aspect-h-1">
          <img
            className="w-full h-full object-cover"
            src={gif.url}
            alt={gif.title}
          />
        </div>
        <div className="p-2">
          <h3 className="text-center text-sm font-medium text-gray-800 truncate">
            {gif.title}
          </h3>
        </div>
      </div>
    </div>
); 