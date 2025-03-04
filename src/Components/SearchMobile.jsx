import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { videoQuery } from "../reducers/VideoSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Suggestion from "./Suggestion";
import { IoMdClose } from "react-icons/io";
import { hideSearchBar } from "../reducers/MenuToggleSlice";
const SearchMobile = () => {
  const query = useSelector((store) => store.video.query);
  const dispatch = useDispatch();
  const [suggested, setSuggested] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const { search } = useSelector((store) => store.menuToggle);
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (query) {
      navigate("/search");
      dispatch(hideSearchBar());
    }
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

  const handleSuggestionClick = (searchText) => {
    setShowSearch(false);
    dispatch(hideSearchBar());
    dispatch(videoQuery(searchText));
    // dispatch(emptyQuery());
  };

  return (
    <div
      className={` w-full fixed md:hidden h-full bg-white px-5 ${
        search ? "top-[-100%]" : "top-0"
      }  py-4 z-20 transition-all`}
    >
      <div className="relative text-xl mb-4   w-full flex justify-end  right-0 ">
        <button
          onClick={() => dispatch(hideSearchBar())}
          className="border rounded-full p-1"
        >
          <IoMdClose />
        </button>
      </div>
      <div className="w-full relative  flex items-center">
        <input
          value={query}
          onChange={(e) => dispatch(videoQuery(e.target.value))}
          onFocus={() => setShowSearch(true)}
          className="w-full   text-sm border outline-none py-2 pl-4        pr-10 rounded-full border-zinc-400"
          type="text"
          placeholder="Search"
        />
        <button
          onClick={handleNavigate}
          className="absolute cursor-pointer text-lg p-2 right-2"
        >
          <BsSearch />
        </button>
        {showSearch && suggested.length > 0 && (
          <div className="absolute bg-gray-100 rounded-md z-99   w-full top-[2.4rem]">
            <Suggestion
              suggested={suggested}
              handleSuggestionClick={handleSuggestionClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchMobile;
