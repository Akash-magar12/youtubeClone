/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { links } from "../utils/links";

const Sidebar = ({ category, setCategory }) => {
  const isMenuOpen = useSelector((store) => store.menuToggle.isMenuOpen);
  if (!isMenuOpen) return null;

  return (
    <div className="hidden lg:flex px-5 py-1 md:w-[15%] h-full">
      <div className="flex w-[80%] flex-col gap-4">
        {links.map(({ id, icon: Icon, videoId, title }) => (
          <div
            onClick={() => setCategory(videoId)}
            className="flex gap-4 hover:bg-gray-100 transition-all px-3 rounded py-3 cursor-pointer items-center"
            key={id}
            role="button"
            tabIndex={0}
            aria-label={`Navigate to ${title}`}
          >
            <span
              className={`text-xl ${category === videoId ? "pb-1 border-b-3 border-red-500" : ""}`}
            >
              <Icon />
            </span>
            <h4 className="text-md">{title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
