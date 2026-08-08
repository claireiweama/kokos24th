import { AnimatePresence, motion } from "motion/react";
import { slideVariants } from "../../utilities/sliderVariants";

export function MobileSlider({
  currentLove,
  direction,
  currentIndex,
  totalLoves,
  onNext,
  onPrevious,
}) {
  return (
    <div className="md:hidden px-4 pt-8 overflow-hidden">
      <div className="flex flex-col items-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentLove.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            dragMomentum={false}
            style={{ touchAction: "pan-y" }}
            onDragEnd={(event, info) => {
              const threshold = 100;

              if (info.offset.x < -threshold && currentIndex < totalLoves - 1) {
                onNext();
              } else if (info.offset.x > threshold && currentIndex > 0) {
                onPrevious();
              }
            }}
            transition={{
              duration: 0.35,
              ease: [0.25, 1, 0.5, 1],
            }}
            className="w-full max-w-lg rounded-2xl bg-white/80 backdrop-blur-md shadow-xl p-4"
          >
            <div className="flex flex-col">
              {/* Image */}
              <div className="w-full">
                <motion.img
                  src={currentLove.image}
                  alt={currentLove.title}
                  className="w-full h-[55vh] rounded-xl object-cover shadow-xl"
                />
              </div>

              {/* Text */}
              <div className="pt-6 px-2 text-center">
                <h2 className="text-2xl font-bold text-[#4A5D7A] mb-2">
                  {currentLove.title}
                </h2>

                <p className="text-base leading-8 text-[#4B5563]">
                  {currentLove.text}
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-col items-center gap-4">
              <p className="text-xs text-gray-500">
                ← Swipe to see more →
              </p>

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
                className="
    inline-flex
    items-center
    gap-2
    rounded-full
    bg-white/85
    backdrop-blur-md
    border
    border-pink-200/70
    px-5
    py-2
    shadow-lg
  "
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
                </motion.span>

                <span className="text-sm font-semibold tracking-wide text-[#E56B8A]">
                   {currentIndex + 1} of {totalLoves}
                </span>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
