import { useState, useEffect, useRef } from "react";
import {
  IoArrowBack,
  IoArrowForward,
  IoEllipseOutline,
  IoEllipseSharp,
  IoHeart,
} from "react-icons/io5";

import { AnimatePresence, motion } from "motion/react";
import HeartsBackground from "../components/HeartsBackground";
import thingsiLoveAboutYou from "../data/thingsILoveAboutYou";

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

function MainPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const currentNote = thingsiLoveAboutYou[currentIndex];
  const isEven = currentIndex % 2 === 0;
  const cardRef = useRef(null);

  // Music
  //   useEffect(() => {
  //     const audio = new Audio("/audio/yellowByColdplay.mp3");

  //     audio.loop = true;

  //     audio.play().catch((err) => {
  //         if (mounted) {
  //             console.error(err);
  //         }
  //       console.log("Playback blocked:", err);
  //     });

  //     return () => {
  //         mounted = false;
  //         audio.pause();
  //         audio.currentTime = 0;
  //     };
//   audio.volume = 0;

// let volume = 0;

// const fade = setInterval(() => {
//   volume += 0.02;

//   if (volume >= 0.25) {
//     volume = 0.25;
//     clearInterval(fade);
//   }

//   audio.volume = volume;
// }, 100);
  //   }, []);

  return (
    <>
      <div ref={cardRef} className="relative min-h-screen overflow-hidden">
  <HeartsBackground />

  <motion.div
    className="relative z-10"
    initial={{
      y: -350,
      opacity: 0,
      scale: 0.9,
    }}
    animate={{
      y: 0,
      opacity: 1,
      scale: 1,
    }}
    transition={{
      type: "spring",
      stiffness: 80,
    damping: 12,
    mass: 1,
    }}
  >
    {/* <div className="relative z-10"> */}
          {/* Heading Text */}
          <div className="flex justify-center pt-8 px-4">
            <h1 className="inline-flex items-center justify-center flex-wrap text-center text-2xl sm:text-3xl md:text-4xl font-bold text-[#4A5D7A]">
              <span>These are the things I Love about You</span>

              <IoHeart className="ml-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-red-500 animate-heartbeat drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
            </h1>
          </div>

          {/* Mobile version */}

          <div className="md:hidden space-y-16 pt-10">
            {thingsiLoveAboutYou.map((note) => (
              <div
                key={note.id}
                className="flex flex-col items-center gap-6 px-6"
              >
                <img
                  src={note.image}
                  alt={note.title}
                  className="w-full max-w-sm rounded-xl shadow-lg"
                />

                <div className="text-center">
                  <h2 className="text-3xl font-bold text-[#4A5D7A] mb-4">
                    {note.title}
                  </h2>

                  <p className="text-lg text-[#4B5563] leading-8">
                    {note.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block pt-10 overflow-hidden">
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
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#4A5D7A] mb-4">
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

          {/* Navigation arrows & dots */}
          <div className=" hidden md:flex justify-center items-center gap-3">
            <IoArrowBack
              className="text-2xl cursor-pointer text-[#E56B8A] hover:scale-125 transition-transform duration-300"
              onClick={() => {
                setDirection(-1);

                setCurrentIndex((prev) =>
                  prev === 0 ? thingsiLoveAboutYou.length - 1 : prev - 1,
                );
              }}
            />

            {thingsiLoveAboutYou.map((_, index) => (
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
                  prev === thingsiLoveAboutYou.length - 1 ? 0 : prev + 1,
                );
              }}
            />
          </div>
        {/* </div> */}
  </motion.div>
</div>
    </>
  );
}

export default MainPage;

//  Fade the music in: Instead of the song starting at full volume, you can gradually increase it over the first couple of seconds.
// Lower the volume: Background music is usually nicer when it's subtle. Also listen for when they press the plus volume button beside the phone to increase and doen button to reduce
// Remember the audio object: If later you want a Mute button, Pause button, or Skip button, store the audio in a ref


