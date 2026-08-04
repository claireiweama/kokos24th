import { useState, useEffect, useRef } from "react";
import {
  IoArrowBack,
  IoArrowForward,
  IoEllipseOutline,
  IoEllipseSharp,
  IoHeart,
} from "react-icons/io5";

import BackgroundMusic from "../components/BackgroundMusic";
import { MobileSlider, } from "../components/MobileSlider";
import DesktopSlider from "../components/DesktopSlider";

import { motion } from "motion/react";
import HeartsBackground from "../components/HeartsBackground";
import { thingsiLoveAboutYou, wishesFromLovedOnes } from "../data/thingsILoveAboutYou";
import Navigation from "../components/Navigation";
import { ThingsILoveAboutYouHeading, LovedByManyHeading } from "../components/Heading"

function MainPage() {
  
  const [currentLoveIndex, setCurrentLoveIndex] = useState(0);
  const [loveDirection, setLoveDirection] = useState(1);


  const [currentWishIndex, setCurrentWishIndex] = useState(0);
  const [wishDirection, setWishDirection] = useState(1);

  
  const currentLove = thingsiLoveAboutYou[currentLoveIndex];
  const currentWish = wishesFromLovedOnes[currentWishIndex];
  
  const cardRef = useRef(null);

  

  return (
    <>
      {/* <BackgroundMusic /> */}
      
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
          
          <ThingsILoveAboutYouHeading />
          <MobileSlider />
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
          <DesktopSlider
            currentNote={currentWish}
            direction={wishDirection}
            isEven={currentWishIndex % 2 === 0}
          />
          <Navigation 
            currentIndex={currentWishIndex}
            setCurrentIndex={setCurrentWishIndex}
            setDirection={setWishDirection}
            totalSlides={wishesFromLovedOnes.length}
          />

        </motion.div>
      </div>
    </>
  );
}

export default MainPage;

// Remember the audio object: If later you want a Mute button, Pause button, or Skip button, store the audio in a ref
