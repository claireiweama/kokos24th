import { AnimatePresence, motion } from "motion/react";
import { slideVariants } from "../../utilities/sliderVariants";

function MobileWishSlider({
  currentWish,
  direction,
  isEven,
  currentIndex,
  totalWishes,
  onNext,
  onPrevious,
}) {
  return (
    <div className="md:hidden pt-8 overflow-hidden px-4">
      <div className="flex justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            style={{ touchAction: "pan-y" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            dragMomentum={false}
            onDragEnd={(event, info) => {
              const swipeThreshold = 100;
              const velocityThreshold = 500;

              if (
                (info.offset.x < -swipeThreshold ||
                  info.velocity.x < -velocityThreshold) &&
                currentIndex < totalWishes - 1
              ) {
                onNext();
              } else if (
                (info.offset.x > swipeThreshold ||
                  info.velocity.x > velocityThreshold) &&
                currentIndex > 0
              ) {
                onPrevious();
              }
            }}
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
            className={`flex flex-col items-center gap-8 w-full max-w-md rounded-2xl bg-white/70 border border-white/40 backdrop-blur-md shadow-lg p-6 px-5 sm:px-8 md:max-w-none md:bg-transparent md:shadow-none md:p-0 md:px-0
                ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
          >
            {/* Picture */}
            <div className="w-full md:w-1/2 flex justify-center p-6">
              <motion.img
                src={currentWish.image}
                alt={currentWish.name}
                className="w-full max-w-[280px] aspect-[4/5] sm:max-w-sm md:max-w-md rounded-xl shadow-lg object-cover"
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

            {/* Text */}
            <div className="w-full md:w-1/2 flex justify-center px-4 sm:px-8 py-2 md:p-8">
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
                <p className="text-base italic sm:text-lg md:text-xl leading-7 sm:leading-8 md:leading-9 text-[#4B5563] text-center md:text-left ">
                  "{currentWish.wish}"
                </p>

                <p className="mt-6 md:mt-8 text-right text-sm sm:text-base md:text-lg font-semibold text-[#E56B8A]">
                  — {currentWish.name}
                </p>
                <p className="mt-4 text-center text-xs text-gray-500">
                  ← Swipe to read more wishes →
                </p>
                <div className="m-4 flex justify-center">
                  <motion.div
                    key={currentIndex}
                    initial={{
                      scale: 0.9,
                      opacity: 0,
                      y: -6,
                    }}
                    animate={{
                      scale: [0.92, 1.08, 1],
                      opacity: 1,
                      y: 0,
                      boxShadow: [
                        "0 0 8px rgba(229,107,138,0.15)",
                        "0 0 18px rgba(229,107,138,0.45)",
                        "0 0 8px rgba(229,107,138,0.15)",
                      ],
                    }}
                    transition={{
                      scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      boxShadow: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      opacity: {
                        duration: 0.25,
                      },
                      y: {
                        duration: 0.25,
                      },
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-white/85 backdrop-blur-md border border-pink-200/70 px-5 py-2 shadow-lg"
                  >
                    <motion.span
                      animate={{
                        rotate: [-8, 8, -8],
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="text-lg"
                    >
                      💌
                    </motion.span>

                    <span className="text-sm font-semibold tracking-wide text-[#E56B8A]">
                      {currentIndex + 1} of {totalWishes}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default MobileWishSlider;
