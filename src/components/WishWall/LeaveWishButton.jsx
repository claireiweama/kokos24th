import { motion } from "motion/react";

function LeaveWishButton({ onClick }) {
  return (
    <div className="flex justify-center mt-10">
      <motion.button
        onClick={onClick}
        animate={{
          scale: [1, 1.03, 1],
        }}
        transition={{
          scale: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        whileHover={{
          scale: 1.15,
        }}
        whileTap={{
          scale: 0.95,
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
          px-8
          py-3
          mb-8
          text-[#E56B8A]
          font-semibold
          shadow-lg
          hover:bg-[#d85a79]
          hover:text-white
        "
      >
        💌&ensp; Leave a Wish
      </motion.button>
    </div>
  );
}

export default LeaveWishButton;