import { motion } from "motion/react";

function MyWish() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="
        mx-auto
        w-[90%]
        sm:w-[80%]
        md:w-[70%]
        lg:w-[60%]
        xl:w-[50%]
        rounded-3xl
        bg-white/80
        backdrop-blur-md
        px-6
        py-8
        mb-16
        sm:px-8
        sm:py-10
        md:px-12
        md:py-12
        shadow-[0_0_30px_rgba(229,107,138,0.35)]
      "
    >
      {/* This container controls the relationship between
          BOTH quotes and the message */}
      <div className="relative py-16 sm:py-20 md:py-24">
        
        {/* Opening quote */}
        <span
          className="
            absolute
            top-0
            left-0
            text-6xl
            font-bold
            leading-none
            text-[#E56B8A]
            sm:text-7xl
            md:text-8xl
            lg:text-9xl
          "
        >
          “
        </span>

        {/* Message */}
        <p
          className="
            px-6
            text-center
            text-lg
            leading-relaxed
            text-[#4B5563]
            sm:px-10
          "
        >
          My dearest Koko, I hope this new year of your life brings you
          everything your heart desires. May you continue to grow, laugh,
          love, and become everything you dream of being.
        </p>

        {/* Closing quote */}
        <span
          className="
            absolute
            bottom-0
            right-0
            text-6xl
            font-bold
            leading-none
            text-[#E56B8A]
            sm:text-7xl
            md:text-8xl
            lg:text-9xl
          "
        >
          ”
        </span>
      </div>
    </motion.div>
  );
}

export default MyWish;


// The spacing is wierd....Fix...