import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Bookmark, ThumbsDown, ThumbsUp } from "lucide-react";
import { PiShareFatLight } from "react-icons/pi";
import { convertToMillionBillionK } from "../utils/constant";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Comments from "../Components/Comments";
import Recommended from "../Components/Recommended";
import { toggleSubscribe } from "../reducers/VideoSlice";
const VideoDetails = () => {
  const { id, categoryId } = useParams();
  const [detailVideo, setDetailVideo] = useState(null);
  const [channelId, setChannelId] = useState([]);
  const [channel, setChannel] = useState([]);
  const subscribed = useSelector((store) => store.video.value);
  const dispatch = useDispatch();
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  const fetchDetailVideos = async () => {
    try {
      let response = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${API_KEY}`
      );
      setDetailVideo(response.data.items[0]);
      setChannelId(response.data.items[0].snippet.channelId);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchDetailVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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

  if (!id) {
    return <p className="text-center text-red-500">Invalid Video ID</p>;
  }
  const randomDislike = Math.floor(Math.random() * 10 + 1);

  return (
    <div className="w-full flex flex-col gap-6 lg:flex-row   min-h-screen md:px-8 p-2  md:p-4">
      <div className="w-full lg:w-[70%] min-h-screen ">
        <iframe
          className="w-full h-[50vh] lg:h-[80vh] aspect-video object-cover"
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          title={`YouTube Video ${id}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <div>
          <h1 className="text-xl font-semibold mt-3">
            {detailVideo?.snippet?.title}
          </h1>
          <div className="flex w-full justify-between border-b border-[#898989] pb-3">
            <div>
              <p className="text-[#5A5A5A] text-sm my-2 font-medium">
                {convertToMillionBillionK(detailVideo?.statistics?.viewCount)}{" "}
                views • {moment(detailVideo?.snippet?.publishedAt).fromNow()}
              </p>
            </div>
            <div className="flex items-center gap-4  font-medium">
              <span className="flex items-center text-sm text-[#5A5A5A] gap-1">
                <ThumbsUp strokeWidth={0.75} />{" "}
                {convertToMillionBillionK(detailVideo?.statistics?.likeCount)}
              </span>

              <span className="flex items-center text-sm text-[#5A5A5A] gap-1">
                <ThumbsDown strokeWidth={0.75} />
                {`${randomDislike}k`}
              </span>
              <span className="text-2xl flex  text-[#5A5A5A] items-center gap-1">
                <PiShareFatLight />
                <span className="text-sm">Share</span>
              </span>
              <span className="text-2xl flex  text-[#5A5A5A] items-center gap-1">
                <Bookmark strokeWidth={0.75} />
                <span className="text-sm">Save</span>
              </span>
            </div>
          </div>
        </div>
        {/* comments */}
        <div className="flex gap-3 w-full  items-start    py-4  ">
          {/* Avatar Section */}
          <div className="md:h-12 h-11 w-11 md:w-12 shrink-0 rounded-full bg-gray-300 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={channel?.[0]?.snippet?.thumbnails?.default?.url}
            />
          </div>

          {/* Comment Section */}
          <div className="flex flex-col  w-full pb-3">
            {/* User Info */}
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-lg font-semibold text-black">
                  {channel?.[0]?.snippet?.localized?.title}
                </h2>
                <p className="text-sm text-[#5A5A5A]">
                  {convertToMillionBillionK(
                    channel?.[0]?.statistics?.subscriberCount
                  )}{" "}
                  Subscribers
                </p>
              </div>
              <button
                onClick={() => dispatch(toggleSubscribe())}
                className={`px-4 py-1 ${
                  subscribed ? "text-white bg-black" : "text-white bg-red-500"
                } rounded-md cursor-pointer text-sm`}
              >
                {`${subscribed ? "Subscribe" : "Subscribed"}`}
              </button>
            </div>

            {/* Comment Text */}
            <p className="text-xs md:text-sm   text-[#5A5A5A] black">
              {detailVideo?.snippet?.description.slice(0, 250)}
            </p>
          </div>
        </div>
        <Comments detailVideo={detailVideo} />
      </div>

      <div className="-full lg:w-[30%] min-h-screen ">
        <Recommended categoryId={categoryId} />
      </div>
    </div>
  );
};

export default VideoDetails;
