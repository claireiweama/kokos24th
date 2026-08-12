import { useState, useEffect, useRef } from "react";
import {
  IoArrowBack,
  IoArrowForward,
  IoEllipseOutline,
  IoEllipseSharp,
  IoHeart,
} from "react-icons/io5";

import BackgroundMusic from "../components/BackgroundMusic";
import BubbleFrame from "../components/WishWall/BubbleFrame";
import WishWall from "../components/WishWall/WishWall";

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
  AndFromMeHeading,
} from "../components/Heading";

import { getWishes, createWish } from "../../utilities/wishService";
import WishWallDisplay from "../components/WishWall/WishWallDisplay";

function MainPage() {
  const [currentLoveIndex, setCurrentLoveIndex] = useState(0);
  const [loveDirection, setLoveDirection] = useState(1);

  const [currentWishIndex, setCurrentWishIndex] = useState(0);
  const [wishDirection, setWishDirection] = useState(1);

  const [wishes, setWishes] = useState([]);

  const currentLove = thingsiLoveAboutYou[currentLoveIndex];
  const currentWish = wishesFromLovedOnes[currentWishIndex];

  const cardRef = useRef(null);

  const nextLove = () => {
    if (currentLoveIndex === thingsiLoveAboutYou.length - 1) return;

    setLoveDirection(1);
    setCurrentLoveIndex((prev) => prev + 1);
  };

  const previousLove = () => {
    if (currentLoveIndex === 0) return;

    setLoveDirection(-1);
    setCurrentLoveIndex((prev) => prev - 1);
  };

  const nextWish = () => {
    if (currentWishIndex === wishesFromLovedOnes.length - 1) return;

    setWishDirection(1);
    setCurrentWishIndex((prev) => prev + 1);
  };

  const previousWish = () => {
    if (currentWishIndex === 0) return;

    setWishDirection(-1);
    setCurrentWishIndex((prev) => prev - 1);
  };

  useEffect(() => {
    const loadWishes = async () => {
      try {
        const data = await getWishes();

        setWishes(data);
      } catch (error) {
        console.error("Failed to load wishes:", error);
      }
    };

    loadWishes();
  }, []);

  const handleWishSubmit = async (formData) => {
    try {
      const newWish = await createWish(formData.name, formData.wish);

      setWishes((prevWishes) => [newWish, ...prevWishes]);

      // console.log("Wish successfully added:", newWish);

      // } catch (error) {
      //   console.error("Failed to submit wish:", error);
      // }

      return newWish;
    } catch (error) {
      console.error("Failed to submit wish:", error);
      throw error;
    }
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
          <WishWallDisplay wishes={wishes} />

          <WishWall onWishSubmitted={handleWishSubmit} />

          <AndFromMeHeading />
        </motion.div>
      </div>
    </>
  );
}

export default MainPage;

// Remember the audio object: If later you want a Mute button, Pause button, or Skip button, store the audio in a ref
// The AI Validation
// Dont forget to make the wish wall empty, by deleteing the text wishes
