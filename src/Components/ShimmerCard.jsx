const ShimmerCard = () => {
  return (
    <div className="bg-white cursor-pointer text-black rounded-lg overflow-hidden shadow-md ">
      <div className="relative">
        <div className="w-full h-52 rounded-md bg-gray-200 animate-pulse" />
        <div className="absolute bottom-2 right-2 bg-gray-300 animate-pulse w-10 h-5 rounded-md" />
      </div>

      {/* Shimmer Effect for Video Info */}
      <div className="py-3 flex">
        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse mr-2" />
        <div className="w-full">
          <div className="h-4 bg-gray-200 animate-pulse rounded-md mb-2 w-full" />
          <div className="h-3 bg-gray-200 animate-pulse rounded-md mb-2 w-2/3" />
          <div className="h-3 bg-gray-200 animate-pulse rounded-md w-1/2" />
        </div>
      </div>
    </div>
  );
};

export default ShimmerCard;
