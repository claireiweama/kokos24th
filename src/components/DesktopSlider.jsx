import { AnimatePresence, motion } from "motion/react";

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),

  center: {
    x: 0,
    opacity: 1,
  },

  exit: (direction) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

function DesktopSlider({
  currentNote,
  direction,
  isEven,
}) {
    return (
    <div 
    className="hidden md:block pt-10 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentNote.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.35,
                  ease: [0.25, 1, 0.5, 1],
                }}
                className={`flex flex-col md:items-center md:justify-center gap-8 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Picture */}
                <div className="w-full md:w-1/2 flex justify-center p-6">
                  <motion.img
                    src={currentNote.image}
                    alt={currentNote.title}
                    className="w-full max-w-md rounded-xl shadow-lg"
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
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#4A5D7A] mb-4">
                      {currentNote.title}
                    </h2>

                    <p className="text-lg text-[#4B5563] leading-8">
                      {currentNote.text}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
);
};

export default DesktopSlider;