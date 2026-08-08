import {
  IoArrowBack,
  IoArrowForward,
  IoEllipseOutline,
  IoEllipseSharp,
} from "react-icons/io5";
import { motion } from "motion/react";

const Navigation = ({
  currentIndex,
  setCurrentIndex,
  setDirection,
  totalSlides,
}) => (
  <div className=" hidden md:flex justify-center items-center gap-3">
    <IoArrowBack
      className={`text-2xl transition-all duration-300 ${
        currentIndex === 0
          ? "text-gray-400 cursor-not-allowed"
          : "text-[#E56B8A] cursor-pointer hover:scale-125"
      }`}
      onClick={() => {
        if (currentIndex === 0) return;

        setDirection(-1);
        setCurrentIndex((prev) => prev - 1);
      }}
    />

    {Array.from({ length: totalSlides }).map((_, index) => (
      <button
        key={index}
        className="hover:scale-125 transition-transform duration-200"
        onClick={() => {
          if (index === currentIndex) return;

          setDirection(index > currentIndex ? 1 : -1);
          setCurrentIndex(index);
        }}
      >
        {index === currentIndex ? (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 35,
            }}
          >
            <IoEllipseSharp className="text-sm text-[#E56B8A]" />
          </motion.div>
        ) : (
          <IoEllipseOutline className="text-sm text-[#E56B8A]" />
        )}
      </button>
    ))}

    <IoArrowForward
      className={`text-2xl transition-all duration-300 ${
        currentIndex === totalSlides - 1
          ? "text-gray-400 cursor-not-allowed"
          : "text-[#E56B8A] cursor-pointer hover:scale-125"
      }`}
      onClick={() => {
        if (currentIndex === totalSlides - 1) return;

        setDirection(1);
        setCurrentIndex((prev) => prev + 1);
      }}
    />
  </div>
);

export default Navigation;
