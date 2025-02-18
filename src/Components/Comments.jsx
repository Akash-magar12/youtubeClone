/* eslint-disable react/prop-types */
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { convertToMillionBillionK } from "../utils/constant";
import axios from "axios";
import { useEffect, useState } from "react";

const Comments = ({ detailVideo }) => {
  const [comments, setComments] = useState([]);
  const commentData = async () => {
    try {
      let response = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${
          detailVideo?.id
        }&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
      );
      setComments(response.data.items);
    } catch (error) {
      console.log(error.message);
    }
  };
 

  useEffect(() => {
    commentData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailVideo?.id]);
  const randomDislike = Math.floor(Math.random() * 10 + 1);

  return (
    <div className="w-full pl-2 md:pl-13  border-[#898989] ">
      <p className="text-[#5A5A5A] border-t  py-3  ">
        {convertToMillionBillionK(detailVideo?.statistics?.commentCount) || 102} {""}
        Comments
      </p>
      <div className="flex flex-col gap-5">
        {comments && comments.length > 0 ? (
          comments.map((com) => (
            <div
              key={com.id}
              className="flex gap-5 w-full  items-start  py-1  "
            >
              <div className="h-9 w-9 shrink-0 rounded-full bg-gray-300 overflow-hidden">
                <img
                  src={
                    com?.snippet?.topLevelComment?.snippet
                      ?.authorProfileImageUrl
                  }
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-sm">
                    {com?.snippet?.topLevelComment?.snippet?.authorDisplayName}
                  </p>
                  <p className="text-[#5A5A5A] text-sm">
                    {com?.snippet?.topLevelComment?.snippet?.textOriginal}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center text-xs text-[#5A5A5A] gap-1">
                    <ThumbsUp strokeWidth={0.75} />{" "}
                    {com?.snippet?.topLevelComment?.snippet?.likeCount}
                  </span>

                  <span className="flex items-center text-xs text-[#5A5A5A] gap-1">
                    <ThumbsDown strokeWidth={0.75} /> {randomDislike}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>loading</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
