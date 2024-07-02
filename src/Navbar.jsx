import { useState } from "react";
import "./index.css";
import Modal from "./Modal";

const Navbar = ({
  setIsMotionClicked,
  isMotionClicked,
  isColorClicked,
  setIsColorClicked,
}) => {
  const [open, setOpen] = useState(false);
  const handleClickModal = () => {
    setOpen(!open);
  };
  return (
    <div className="md:mt-[0px] mt-[16px]">
      <nav className="flex justify-between pt-1 gap-x-4 md:gap-x-6 items-start">
        <a
          href="#news"
          className="cursor-pointer font-pilat text-[14px] md:text-[20px] leading-[25px] font-bold md:pb-1  border-b-[1.3px] border-black text-black ease-in transition-all hover:text-white hover:border-white"
        >
          NEWS
        </a>
        <a
          href="#careers"
          className="cursor-pointer font-pilat text-[14px] md:text-[20px] leading-[25px] font-bold md:pb-1 border-b-[1.3px] border-black text-black ease-in transition-all hover:text-white hover:border-white"
        >
          CAREERS
        </a>
        <a
          href="#investors"
          className="cursor-pointer font-pilat text-[14px] md:text-[20px] leading-[25px] font-bold md:pb-1 border-b-[1.3px] border-black text-black ease-in transition-all hover:text-white hover:border-white"
        >
          INVESTORS
        </a>
        <button
          onClick={handleClickModal}
          className="text-black min-h-[20px] xl:w-[20px] w-[16px] ease-in transition-all hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="100%"
            width="100%"
            viewBox="0 0 14 17"
            fill="none"
          >
            <path d="M8.5 0H5.5V3H8.5V0Z" fill="currentColor"></path>
            <path d="M0 5H14V7H10V17H8V13H6V17H4V7H0V5Z" fill="currentColor"></path>
          </svg>
        </button>
        <Modal
          open={open}
          setOpen={setOpen}
          isMotionClicked={isMotionClicked}
          setIsMotionClicked={setIsMotionClicked}
          setIsColorClicked={setIsColorClicked}
          isColorClicked={isColorClicked}
        />
      </nav>
    </div>
  );
};

export default Navbar;
