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
              className="text-2xl cursor-pointer text-[#E56B8A] hover:scale-125 transition-transform duration-300"
              onClick={() => {
                setDirection(-1);

                setCurrentIndex((prev) =>
                  prev === 0 ? totalSlides - 1 : prev - 1,
                );
              }}
            />

            {Array.from( { length: totalSlides}).map((_, index) => (
              <button
                key={index}
                className="hover:scale-125 transition-transform duration-200"
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
              >
                {index === currentIndex ? (
                  <motion.div
                    layoutId="activeDot"
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
              className="text-2xl cursor-pointer text-[#E56B8A] hover:scale-125 transition-transform duration-300"
              onClick={() => {
                setDirection(1);

                setCurrentIndex((prev) =>
                  prev === totalSlides - 1 ? 0 : prev + 1,
                );
              }}
            />
          </div>
)

export default Navigation;