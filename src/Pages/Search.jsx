import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { videoRemoveResult, videoSearchResult } from "../reducers/VideoSlice";
import SearchCards from "../Components/SearchCards";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const Search = () => {
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const { searchResult, query } = useSelector((store) => store.video);
  const dispatch = useDispatch();

  const searchVideos = async () => {
    if (!query) return;

    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&type=video&key=${API_KEY}`
      );
      dispatch(videoSearchResult(response.data.items));
    } catch (error) {
      console.error("Error fetching videos:", error.message);
    }
  };

  useEffect(() => {
    if (!query) {
      dispatch(videoRemoveResult()); // Clear results when query is empty
      return;
    }

    const timer = setTimeout(() => {
      searchVideos();
    }, 250);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  console.log(searchResult);

  return (
    <>
      {searchResult && searchResult.length > 0 ? (
        searchResult.map((video) => (
          <Link
            key={video.id.videoId}
            to={`/watch/${video.snippet.categoryId}/${video.id.videoId}`}
          >
            <SearchCards video={video} />
          </Link>
        ))
      ) : (
        <div className="w-full h-[70vh] flex justify-center items-center ">
          <ClipLoader  size={50}/>
        </div>
      )}
    </>
  );
};

export default Search;
