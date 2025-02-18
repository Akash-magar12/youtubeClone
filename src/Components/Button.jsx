import { useDispatch } from "react-redux";
import { videoList } from "../reducers/VideoSlice";

/* eslint-disable react/prop-types */
const Button = ({ button, active, setActive }) => {
  const dispatch = useDispatch();
  const handleChange = (title) => {
    setActive(title);
    dispatch(videoList(title));
  };
  return (
    <button
      onClick={() => handleChange(button.title)}
      className={` ${
        active === button.title
          ? "bg-black text-white"
          : " bg-gray-100 hover:bg-gray-200 text-black"
      } shrink-0 cursor-pointer  transition-all  px-4 py-1 text-sm rounded-lg`}
    >
      {button.title}
    </button>
  );
};

export default Button;
