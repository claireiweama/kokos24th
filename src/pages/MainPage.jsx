import { ThingsILoveAboutYouHeading, LovedByManyHeading, WishWallHeading, AndFromMeHeading, } from "../components/Heading";
import { thingsiLoveAboutYou, wishesFromLovedOnes, } from "../data/thingsILoveAboutYou";
import { getWishes, createWish } from "../../utilities/wishService";
import { useState, useEffect } from "react";
import { MobileSlider } from "../components/MobileSlider";
import { motion } from "motion/react";


import BackgroundMusic from "../components/BackgroundMusic";
import WishWall from "../components/WishWall/WishWall";
import MobileWishSlider from "../components/MobileWishSlider";
import MyWish from "../components/MyWish";
import DesktopSlider from "../components/DesktopSlider";
import DesktopWishSlider from "../components/DesktopWishSlider";
import HeartsBackground from "../components/HeartsBackground";
import Navigation from "../components/Navigation";
import WishWallDisplay from "../components/WishWall/WishWallDisplay";
import TestModel from "../components/SistersSection/TestModel";
import Footer from "../components/Footer";


function MainPage() {
  const [currentLoveIndex, setCurrentLoveIndex] = useState(0);
  const [loveDirection, setLoveDirection] = useState(1);

  const [currentWishIndex, setCurrentWishIndex] = useState(0);
  const [wishDirection, setWishDirection] = useState(1);

  const [wishes, setWishes] = useState([]);

  const currentLove = thingsiLoveAboutYou[currentLoveIndex];
  const currentWish = wishesFromLovedOnes[currentWishIndex];

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

      return newWish;
    } catch (error) {
      console.error("Failed to submit wish:", error);
      throw error;
    }
  };

  return (
    <>
      {/* <BackgroundMusic /> */}

      <div className="relative min-h-screen overflow-hidden">
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
            currentIndex={currentWishIndex}
            totalWishes={wishesFromLovedOnes.length}
            onNext={nextWish}
            onPrevious={previousWish}
          />
          <DesktopWishSlider
            currentWish={currentWish}
            direction={wishDirection}
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
          <MyWish />
          <TestModel />

          <Footer />
          
        </motion.div>
      </div>
    </>
  );
}

export default MainPage;

