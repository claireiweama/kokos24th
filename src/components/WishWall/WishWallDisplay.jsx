import { motion } from "motion/react";
import BubbleFrame from "./BubbleFrame";
import pastelColors from "../../data/pastelColors";

const wishStyles = [
  {
    rotate: -2,
    marginTop: 0,
  },
  {
    rotate: 2,
    marginTop: 20,
  },
  {
    rotate: -1,
    marginTop: 35,
  },
  {
    rotate: 3,
    marginTop: 10,
  },
  {
    rotate: -3,
    marginTop: 25,
  },
];

const getWishColor = (id) => {
  const mixedNumber = (id * 17 + 23) % pastelColors.length;

  return pastelColors[mixedNumber];
};

function WishWallDisplay({ wishes }) {
  return (
    <BubbleFrame>
      {wishes.length === 0 ? (
        <p className="text-center text-[#4B5563]">
          Be the first to leave Koko a birthday wish! 💕
        </p>
      ) : (
        <div className="flex flex-wrap items-start gap-4">
          {wishes.map((wish, index) => {
            const style = wishStyles[index % wishStyles.length];
            const borderColor = getWishColor(wish.id);

            return (
              <motion.div
                key={wish.id}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: style.rotate,
                }}
                transition={{
                  duration: 0.4,
                }}
                style={{
                  marginTop: `${style.marginTop}px`,
                  borderColor: borderColor,
                }}
                className="
                  w-full
                  sm:w-[48%]
                  rounded-2xl
                  border-2
                  bg-white/70
                  p-4
                  shadow-md
                "
              >
                <p className="text-[#4B5563]">
                  {wish.wish}
                </p>

                <p className="mt-3 font-semibold text-[#E56B8A]">
                  — {wish.name}
                </p>
              </motion.div>
            );
          })}
        </div>
      )}
    </BubbleFrame>
  );
}

export default WishWallDisplay;