import { AiOutlineMenu } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import avatar from "../assets/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../reducers/MenuToggleSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import Suggestion from "./Suggestion";
import { Link } from "react-router-dom";
import { videoQuery } from "../reducers/VideoSlice";

const Header = () => {
  const dispatch = useDispatch();
  const [suggested, setSuggested] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const query = useSelector((store) => store.video.query);
  const handleMenu = () => {
    dispatch(toggleMenu());
  };
  const suggestSearch = async () => {
    try {
      let response = await axios.get(
        `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${query}`
      );
      setSuggested(response.data[1]);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => suggestSearch(), 250);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  return (
    <nav className="flex w-full shadow-sm py-2 px-8 items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleMenu}
          className="text-xl hidden lg:flex cursor-pointer"
        >
          <AiOutlineMenu />
        </button>
        <Link to="/">
          <img
            className="h-7"
            src="https://vidtube-sable.vercel.app/assets/logo-koDzNJgp.png"
            alt="Vidtube Logo"
          />
        </Link>
      </div>

      {/* Search Bar */}
      <div className="w-[40%] relative hidden md:flex items-center">
        <input
          value={query}
          onChange={(e) => dispatch(videoQuery(e.target.value))}
          onFocus={() => setShowSearch(true)}
          onBlur={() => setShowSearch(false)}
          className="w-full   text-sm border outline-none py-2 pl-4        pr-10 rounded-full border-zinc-400"
          type="text"
          placeholder="Search"
        />
        <button className="absolute cursor-pointer text-lg p-2 right-2">
          <BsSearch />
        </button>
        {showSearch && suggested.length > 0 && (
          <div className="absolute bg-gray-100 rounded-md z-99   w-full top-[2.4rem]">
            <Suggestion suggested={suggested} />
          </div>
        )}
      </div>
      <span className="lg:hidden">
        <BsSearch />
      </span>

      {/* Right Section (Avatar) */}
      <div className="hidden md:flex gap-3 items-center">
        <div className="h-10 w-10 rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={avatar}
            alt="User Avatar"
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
