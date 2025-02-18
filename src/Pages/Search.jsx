import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { videoSearchResult } from "../reducers/VideoSlice";

const Search = () => {
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const { searchResult } = useSelector((store) => store.video);
  const dispatch = useDispatch();
  const searchVideos = async () => {
    try {
      let response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=namastejavascript&type=video&key=${API_KEY}`
      );
      dispatch(videoSearchResult(response.data.items));
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(searchResult);
  useEffect(() => {
    searchVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {searchResult && searchResult.length > 0 ? (
        searchResult.map((video) => (
          <div
            key={video.id?.videoId}
            className="max-w-6xl mx-auto mt-10  text-black"
          >
            <div className="flex flex-col md:flex-row shadow-md  rounded-lg overflow-hidden">
              <div className="relative md:w-1/2">
                <div className="relative overflow-hidden">
                  <img
                    src="https://imgs.search.brave.com/VJni2dvvAA1gVXcVRCaVKO5dahIhzTVz_AM_-rqv684/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuenlyb3NpdGUu/Y29tL2Nkbi1jZ2kv/aW1hZ2UvZm9ybWF0/PWF1dG8sdz04MTIs/aD00NTcsZml0PWNy/b3AvQVIwYjVYRHFC/QkZuUVFSVi80ZDVl/cGFrMW01cDUxLTEt/WXl2Wk9LUjgyMnVQ/ejY5cS5qcGc"
                    alt="Anime character with text overlaid"
                    className="w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h1 className="text-5xl font-bold text-white drop-shadow-lg">
                        DIE WITH A<br />
                        SMILE
                      </h1>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded text-sm text-white">
                    4:13
                  </div>
                </div>
              </div>

              <div className="p-4 md:w-1/2 flex flex-col">
                <h2 className="text-xl font-bold mb-2">
                  Attack on Titan - Die with a smile [AMV]
                </h2>
                <div className="text-gray-600 text-sm">
                  2.8M views • 2 months ago
                </div>

                <div className="flex items-center mt-4 space-x-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                    <img
                      src="https://imgs.search.brave.com/9pYTrJBeG7uXgeW-HalmcdVffhBnlplb4FueRr10-OE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMwLmdhbWVyYW50/aW1hZ2VzLmNvbS93/b3JkcHJlc3Mvd3At/Y29udGVudC91cGxv/YWRzLzIwMjEvMDgv/RXJlbi1ZZWFnYXIu/anBlZw"
                      alt="User profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-gray-700">tiff.</span>
                </div>

                <p className="mt-4 text-sm text-gray-600 truncate">
                  someone said make an aot amv so i did :
                  https://ko-fi.com/tiff2255 - please don feel obliged but if
                  you wanna donate anything...
                </p>

                <div className="mt-4">
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-3 rounded">
                    4K
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default Search;
