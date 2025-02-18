import { useSelector } from "react-redux";
import { links } from "../utils/links";

const MobileSlider = () => {
  const isMenuOpen = useSelector((store) => store.menuToggle.isMenuOpen);
  if (!isMenuOpen) return null;

  return (
    <div className="hidden lg:flex py-1 md:w-[15%] h-full">
      <div className="flex  w-full flex-col gap-6">
        {links.map((d) => (
          <div
            className="flex gap-2 hover:bg-gray-100 transition-all rounded px-3 py-2 cursor-pointer items-center"
            key={d.id}
          >
            <span className="text-2xl">{<d.icon />}</span>
            <h4 className="text-md">{d.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileSlider;
