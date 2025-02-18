/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import VideoCard from "../Components/VideoCard";
import ShimmerCard from "../Components/ShimmerCard";

const VideoContainer = ({ category }) => {
  const isMenuOpen = useSelector((store) => store.menuToggle.isMenuOpen);
  const [allVideo, setAllVideo] = useState([]);
  console.log(allVideo);
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const fetchVideos = async () => {
    try {
      let response = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`
      );
      setAllVideo(response?.data?.items);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchVideos();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);
  return (
    <div
      className={`${
        isMenuOpen ? "lg:w-[85%] ] " : "w-full"
      } scroll h-full overflow-y-auto  `}
    >
      <div className="mb-4 ">
        <div className="grid grids ">
          {allVideo.length > 0 ? (
            allVideo.map((video) => (
              <Link
                key={video.id}
                to={`/watch/${video.snippet.categoryId}/${video.id}`}
              >
                <VideoCard video={video} />
              </Link>
            ))
          ) : (
            <div className="grid grids   ">
              {Array.from({ length: 10 }).map((_, index) => (
                <ShimmerCard key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoContainer;
