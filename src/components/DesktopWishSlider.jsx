import { AnimatePresence, motion } from "motion/react";
import { slideVariants } from "../../utilities/sliderVariants";

function DesktopWishSlider({ currentWish, direction }) {
  return (
    <div className="hidden md:block pt-10 overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentWish.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.35,
            ease: [0.25, 1, 0.5, 1],
          }}
          className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-center
            gap-8
          "
        >
          <div className="w-full md:w-1/2 flex justify-center p-6">
            <motion.img
              src={currentWish.image}
              alt={currentWish.name}
              className="w-full max-w-md rounded-xl shadow-lg object-contain"
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.25,
                delay: 0,
              }}
            />
          </div>

          <div className="w-full md:w-1/2 flex justify-center p-8">
            <motion.div
              className="max-w-lg"
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.25,
                delay: 0.05,
              }}
            >
              <p className="text-xl italic leading-9 text-gray-700 whitespace-pre-line">
                "{currentWish.wish}"
              </p>

              <p className="mt-8 text-right text-lg font-semibold text-[#E56B8A]">
                — {currentWish.name}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default DesktopWishSlider;