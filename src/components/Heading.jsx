import {  IoHeart } from "react-icons/io5";

export function ThingsILoveAboutYouHeading () {
  return (
    <div className="flex justify-center pt-8 px-4">
            <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-[#4A5D7A]">
              <span>These are the things I Love about You</span>

              <IoHeart className="inline-block -translate-y-0.5 ml-2 text-3xl sm:text-3xl md:text-4xl lg:text-5xl text-red-500 animate-heartbeat drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
            </h1>
    </div>
  );
}


export function LovedByManyHeading () {
  return (
    <div className=" justify-center py-8 px-4">
            <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-[#4A5D7A] py-4">
              <span>Although I Love you the most, I hope you know you're loved by many!</span>
            </h1>
            <h2 className="text-center text-2xl font-semibold text-[#4B5563]">Here are a few wishes from the people who love you</h2>
            <p className="italic text-xs sm:text-sm md:text-base text-[#E56B8A] text-center">Unfortunately they can't Love you as much as I do</p>
    </div>
  );
}


export function WishWallHeading () {
  return (
    <div className=" justify-center py-8 px-4">
            <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-[#4A5D7A] py-4">
              Wish Wall
            </h1>
            <p className="italic text-xs sm:text-sm md:text-base text-[#E56B8A] text-center">Even those who don't know you have some wishes for you, Read them below...</p>
    </div>
  );
}


