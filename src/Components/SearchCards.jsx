/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { convertToMillionBillionK, formatDuration } from "../utils/constant";
import moment from "moment";

/* eslint-disable react/prop-types */
const SearchCards = ({ video }) => {
  const { snippet, id } = video;
  const [channel, setChannel] = useState(null);
  const [videoDetails, setVideoDetails] = useState(null);
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const { channelId, publishedAt } = snippet;
  const videoId = id?.videoId;

  // Fetch Channel Details
  const fetchChannel = async () => {
    if (!channelId) return;
    try {
      let response = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${API_KEY}`
      );
      setChannel(response.data.items?.[0]);
    } catch (error) {
      console.log("Error fetching channel data:", error.message);
    }
  };

  // Fetch Video Details (Duration & Views)
  const fetchVideoDetails = async () => {
    if (!videoId) return;
    try {
      let response = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoId}&key=${API_KEY}`
      );
      setVideoDetails(response.data.items?.[0]);
    } catch (error) {
      console.log("Error fetching video details:", error.message);
    }
  };

  useEffect(() => {
    fetchChannel();
    fetchVideoDetails();
  }, [channelId, videoId]);

  return (
    <div
    key={video.id}
    className="max-w-6xl cursor-pointer mx-auto mt-4 sm:mt-6 md:mt-10 px-5 lg:px-0 md:px-20 text-black bg-white rounded-lg  overflow-hidden"
  >
    <div className="flex flex-col lg:flex-row">
      {/* Video Thumbnail */}
      <div className="relative w-full lg:w-1/2 h-48 sm:h-56 md:h-64 lg:h-80">
        <img
          src={snippet?.thumbnails?.high?.url}
          alt={snippet?.title}
          className="w-full h-full object-cover"
        />
        {/* Video Duration */}
        {videoDetails?.contentDetails?.duration && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded text-xs sm:text-sm text-white">
            {formatDuration(videoDetails.contentDetails.duration)}
          </div>
        )}
      </div>
      
      {/* Video Details */}
      <div className="p-3 sm:p-4 lg:w-1/2 flex flex-col">
        <h2 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 line-clamp-2">{snippet?.title}</h2>
        
        {/* Views & Time */}
        <p className="text-[#5A5A5A] text-xs sm:text-sm my-1 sm:my-2 font-medium">
          {videoDetails?.statistics?.viewCount
            ? `${convertToMillionBillionK(
                videoDetails.statistics.viewCount
              )} views`
            : "0 views"}{" "}
          • {moment(publishedAt).fromNow()}
        </p>
        
        {/* Channel Info */}
        <div className="flex items-center mt-2 sm:mt-4 space-x-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full overflow-hidden">
            {channel?.snippet?.thumbnails?.default?.url ? (
              <img
                src={channel.snippet.thumbnails.default.url}
                alt={channel.snippet.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300"></div>
            )}
          </div>
          <span className="text-gray-700 text-sm sm:text-base truncate max-w-[calc(100%-2.5rem)]">
            {channel?.snippet?.title || snippet?.channelTitle}
          </span>
        </div>
        
        {/* Video Description */}
        <p className="mt-2 sm:mt-4 text-xs sm:text-sm text-gray-600 line-clamp-2 sm:line-clamp-3 md:line-clamp-4">
          {snippet?.description}
        </p>
      </div>
    </div>
  </div>
  );
};

export default SearchCards;
