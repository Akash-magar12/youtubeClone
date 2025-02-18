/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { convertToMillionBillionK } from "../utils/constant";
import moment from "moment";
import { Link } from "react-router-dom";

const Recommended = ({ categoryId }) => {
  const [recommended, setRecommended] = useState([]);

  const fetchRecommendedVideos = async () => {
    try {
      let response = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categoryId}&key=${
          import.meta.env.VITE_YOUTUBE_API_KEY
        }`
      );
      setRecommended(response.data.items);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchRecommendedVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);
  return (
    <div className="w-full  flex flex-col gap-3  h-full">
      {recommended && recommended.length > 0 ? (
        recommended.map((item) => (
          <Link
            to={`/watch/${item.snippet.categoryId}/${item.id}`}
            key={item.id}
            className="w-full flex items-start gap-2"
          >
            <img
              className="w-50"
              src={item?.snippet?.thumbnails?.high?.url}
              alt=""
            />
            <div className="flex flex-col gap-1">
              <p className="text-sm">{item?.snippet?.localized?.title}</p>
              <p className="text-sm">{item?.snippet?.channelTitle}</p>
              <p className="text-xs text-gray-500">
                {convertToMillionBillionK(item?.statistics?.viewCount)} views •{" "}
                {moment(item?.snippet?.publishedAt).fromNow()}
              </p>
            </div>
          </Link>
        ))
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default Recommended;
