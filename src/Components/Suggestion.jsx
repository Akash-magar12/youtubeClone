/* eslint-disable react/prop-types */
import { BsSearch } from "react-icons/bs";

const Suggestion = ({ suggested, handleSuggestionClick }) => {
  return (
    <ul className="flex flex-col ">
      {suggested.map((sug, i) => (
        <li
          onClick={() => handleSuggestionClick(sug)}
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
