import { IoHeart } from "react-icons/io5";
import { useState, useEffect, useCallback } from "react";
import pastelColors from "../data/pastelColors";

function HeartsBackground({ avoidRef }) {
  const [hearts, setHearts] = useState([]);

  const generateHearts = useCallback(() => {
    const generated = [];

    const avoidRect = avoidRef?.current?.getBoundingClientRect();

    let attempts = 0;

    while (generated.length < 100 && attempts < 1000) {
      attempts++;

      const size = Math.random() * 12 + 6;

      const x = Math.random() * (window.innerWidth - size);
      const y = Math.random() * (window.innerHeight - size);

      if (avoidRect) {
        const inside =
          x > avoidRect.left - size &&
          x < avoidRect.right + size &&
          y > avoidRect.top - size &&
          y < avoidRect.bottom + size;

        if (inside) continue;
      }

      generated.push({
        x,
        y,
        size,
        color:
          pastelColors[Math.floor(Math.random() * pastelColors.length)],
        rotate: Math.random() * 360,
        scale: Math.random() * 0.4 + 0.8,
        opacity: Math.random() * 0.5 + 0.3,
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 4,
      });
    }

    setHearts(generated);
  }, [avoidRef]);

  useEffect(() => {
    generateHearts();

    window.addEventListener("resize", generateHearts);

    return () =>
      window.removeEventListener("resize", generateHearts);
  }, [generateHearts]);

  return (
    <>
      {hearts.map((heart, index) => (
        <IoHeart
          key={index}
          className="fixed pointer-events-none select-none"
          style={{
            left: heart.x,
            top: heart.y,
            fontSize: heart.size,
            color: heart.color,
            transform: `rotate(${heart.rotate}deg) scale(${heart.scale})`,
            animation: `heartbeat ${heart.duration}s ${heart.delay}s infinite`,
            opacity: heart.opacity,
            zIndex: 0,
          }}
        />
      ))}
    </>
  );
}

export default HeartsBackground;