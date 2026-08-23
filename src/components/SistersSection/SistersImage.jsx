import { motion, useMotionValue, useTransform } from "motion/react";


function SistersImage() {
  // Tracks the horizontal position of the mouse
  const x = useMotionValue(0);

  // Tracks the vertical position of the mouse
  const y = useMotionValue(0);

  // Converts mouse movement into a slight 3D rotation
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    // Find the mouse position relative to the center of the image
    const mouseX = event.clientX - rect.left - rect.width / 2;
    const mouseY = event.clientY - rect.top - rect.height / 2;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    // Return the image to its normal position
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className="flex justify-center"
      style={{
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.img
        src="/images/sisters.png"
        alt="Two sisters hugging"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          y: [0, -12, 0],
        }}
        transition={{
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotateX: {
            type: "spring",
            stiffness: 100,
            damping: 15,
          },
          rotateY: {
            type: "spring",
            stiffness: 100,
            damping: 15,
          },
        }}
        whileHover={{
          scale: 1.05,
        }}
        className="
          w-full
          max-w-[450px]
          cursor-pointer
          select-none
        "
      />
    </div>
  );
}

export default SistersImage;