import { useState, useEffect, useRef } from "react";
import {
  IoArrowBack,
  IoArrowForward,
  IoEllipseOutline,
  IoEllipseSharp,
  IoHeart,
} from "react-icons/io5";

import BackgroundMusic from "../components/BackgroundMusic";

import { MobileSlider } from "../components/MobileSlider";
import MobileWishSlider from "../components/MobileWishSlider";

import DesktopSlider from "../components/DesktopSlider";
import DesktopWishSlider from "../components/DesktopWishSlider";

import { motion } from "motion/react";
import HeartsBackground from "../components/HeartsBackground";
import {
  thingsiLoveAboutYou,
  wishesFromLovedOnes,
} from "../data/thingsILoveAboutYou";
import Navigation from "../components/Navigation";
import {
  ThingsILoveAboutYouHeading,
  LovedByManyHeading,
  WishWallHeading,
} from "../components/Heading";

function MainPage() {
  const [currentLoveIndex, setCurrentLoveIndex] = useState(0);
  const [loveDirection, setLoveDirection] = useState(1);

  const [currentWishIndex, setCurrentWishIndex] = useState(0);
  const [wishDirection, setWishDirection] = useState(1);

  const currentLove = thingsiLoveAboutYou[currentLoveIndex];
  const currentWish = wishesFromLovedOnes[currentWishIndex];

  const cardRef = useRef(null);

  const nextLove = () => {
  setLoveDirection(1);

  setCurrentLoveIndex((prev) =>
    prev === thingsiLoveAboutYou.length - 1 ? 0 : prev + 1
  );
};

const previousLove = () => {
  setLoveDirection(-1);

  setCurrentLoveIndex((prev) =>
    prev === 0 ? thingsiLoveAboutYou.length - 1 : prev - 1
  );
};

  const nextWish = () => {
    setWishDirection(1);

    setCurrentWishIndex((prev) =>
      prev === wishesFromLovedOnes.length - 1 ? 0 : prev + 1,
    );
  };

  const previousWish = () => {
    setWishDirection(-1);

    setCurrentWishIndex((prev) =>
      prev === 0 ? wishesFromLovedOnes.length - 1 : prev - 1,
    );
  };

  return (
    <>
      {/* <BackgroundMusic /> */}

      <div ref={cardRef} className="relative min-h-screen overflow-hidden">
        <HeartsBackground />

        {/* can i import motion.div? */}
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
          <ThingsILoveAboutYouHeading />

          <MobileSlider
            currentLove={currentLove}
            direction={loveDirection}
            currentIndex={currentLoveIndex}
            totalLoves={thingsiLoveAboutYou.length}
            onNext={nextLove}
            onPrevious={previousLove}
          />
          <DesktopSlider
            currentNote={currentLove}
            direction={loveDirection}
            isEven={currentLoveIndex % 2 === 0}
          />
          <Navigation
            currentIndex={currentLoveIndex}
            setCurrentIndex={setCurrentLoveIndex}
            setDirection={setLoveDirection}
            totalSlides={thingsiLoveAboutYou.length}
          />

          <LovedByManyHeading />
          <MobileWishSlider
            currentWish={currentWish}
            direction={wishDirection}
            isEven={currentWishIndex % 2 === 0}
            currentIndex={currentWishIndex}
            totalWishes={wishesFromLovedOnes.length}
            onNext={nextWish}
            onPrevious={previousWish}
          />
          <DesktopWishSlider
            currentWish={currentWish}
            direction={wishDirection}
            isEven={currentWishIndex % 2 === 0}
          />
          <Navigation
            currentIndex={currentWishIndex}
            setCurrentIndex={setCurrentWishIndex}
            setDirection={setWishDirection}
            totalSlides={wishesFromLovedOnes.length}
          />

          <WishWallHeading />
        </motion.div>
      </div>
    </>
  );
}

export default MainPage;

// Remember the audio object: If later you want a Mute button, Pause button, or Skip button, store the audio in a ref
