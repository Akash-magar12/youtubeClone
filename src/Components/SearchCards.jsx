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
      key={videoId}
      className="max-w-6xl cursor-pointer h-80 mx-auto mt-10 text-black bg-white rounded-lg  overflow-hidden"
    >
      <div className="flex flex-col  md:flex-row">
        {/* Video Thumbnail */}
        <div className="relative md:w-1/2">
          <img
            src={snippet?.thumbnails?.high?.url}
            alt={snippet?.title}
            className="w-full h-full object-contain"
          />
          {/* Video Duration */}
          {videoDetails?.contentDetails?.duration && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded text-sm text-white">
              {formatDuration(videoDetails.contentDetails.duration)}
            </div>
          )}
        </div>

        {/* Video Details */}
        <div className="px-4 md:w-1/2 flex flex-col">
          <h2 className="text-xl font-bold mb-2">{snippet?.title}</h2>

          {/* Views & Time */}
          <p className="text-[#5A5A5A] text-sm my-2 font-medium">
            {videoDetails?.statistics?.viewCount
              ? `${convertToMillionBillionK(
                  videoDetails.statistics.viewCount
                )} views`
              : "0 views"}{" "}
            • {moment(publishedAt).fromNow()}
          </p>

          {/* Channel Info */}
          <div className="flex items-center mt-4 space-x-2">
            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
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
            <span className="text-gray-700">
              {channel?.snippet?.title || snippet?.channelTitle}
            </span>
          </div>

          {/* Video Description */}
          <p className="mt-4 text-sm text-gray-600 truncate">
            {snippet?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchCards;
