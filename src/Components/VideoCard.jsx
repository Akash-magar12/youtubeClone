/* eslint-disable react/prop-types */

import moment from "moment";
import { convertToMillionBillionK, formatDuration } from "../utils/constant";
import { useEffect, useState } from "react";
import axios from "axios";

const VideoCard = ({ video }) => {
  const { snippet, statistics, contentDetails } = video;
  const [channel, setChannel] = useState([]);
  const { thumbnails, channelTitle, title, publishedAt, channelId } = snippet;
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  const fetchChannel = async () => {
    try {
      let response = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${API_KEY}`
      );
      setChannel(response.data.items);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchChannel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId]);

  return (
    <div className="bg-white  cursor-pointer text-black rounded-lg overflow-hidden">
      <div className="relative">
        {/* Video Thumbnail */}
        <img
          src={thumbnails?.high?.url || thumbnails?.high?.url} // Fallback to default thumbnail if unavailable
          alt="video thumbnail"
          className="w-full h-52 rounded-md object-cover"
        />

        {/* Video Duration Overlay */}
        <span className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 text-xs font-bold rounded-md">
          {formatDuration(contentDetails?.duration)}
        </span>
      </div>

      {/* Video Info */}
      <div className="py-3 flex">
        {/* Channel Avatar */}
        <img
          src={channel?.[0]?.snippet?.thumbnails?.default?.url} // Fallback to default avatar if unavailable
          alt="channel avatar"
          className="w-8 h-8 rounded-full object-cover mr-2"
        />

        {/* Text Info */}
        <div>
          <h3 className="text-sm font-bold line-clamp-2">{title}</h3>
          <p className="text-xs text-gray-600">{channelTitle}</p>
          <p className="text-xs text-gray-500">
            {convertToMillionBillionK(statistics?.viewCount)} views •{" "}
            {moment(publishedAt).fromNow()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
