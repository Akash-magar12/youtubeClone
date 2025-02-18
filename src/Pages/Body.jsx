import { useState } from "react";
import Sidebar from "../Components/Sidebar";
import VideoContainer from "./VideoContainer";

const Body = () => {
  const [category, setCategory] = useState("0");
  return (
    <div className="flex px-5 pt-6 h-screen ">
      <Sidebar category={category} setCategory={setCategory} />
      <VideoContainer category={category} setCategory={setCategory} />
    </div>
  );
};

export default Body;
