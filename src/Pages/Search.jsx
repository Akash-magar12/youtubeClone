import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { videoRemoveResult, videoSearchResult } from "../reducers/VideoSlice";
import SearchCards from "../Components/SearchCards";

const Search = () => {
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const { searchResult, query } = useSelector((store) => store.video);
  const dispatch = useDispatch();

  const searchVideos = async () => {
    if (!query) return;

    try {
      let response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&type=video&key=${API_KEY}`
      );
      dispatch(videoSearchResult(response.data.items));
    } catch (error) {
      console.error("Error fetching videos:", error.message);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) searchVideos();
    }, 250);
    return () => {
      clearTimeout(timer);
      dispatch(videoRemoveResult());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <>
      {searchResult && searchResult.length > 0 ? (
        searchResult.map((video, id) => <SearchCards key={id} video={video} />)
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Search;
