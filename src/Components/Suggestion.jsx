/* eslint-disable react/prop-types */
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Suggestion = ({ suggested, handleSuggestionClick }) => {
  const navigate = useNavigate();

  const handleNavigate = (sug) => {
    handleSuggestionClick(sug);
    navigate("/search");
  };
  return (
    <ul className="flex flex-col ">
      {suggested.map((sug, i) => (
        <li
          onClick={() => handleNavigate(sug)}
          key={i}
          className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-200 transition-all  gap-3"
        >
          <span>
            <BsSearch />
          </span>
          <span className="text-sm">{sug}</span>
        </li>
      ))}
    </ul>
  );
};

export default Suggestion;
