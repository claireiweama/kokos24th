import { useEffect } from 'react';

function BackgroundMusic() {
    useEffect(() => {
    const audio = new Audio("/audio/yellowByColdplay.mp3");

    audio.loop = true;
    audio.volume = 0;
    let volume = 0;

    audio.play().catch((err) => {
      console.log(err);
    });

    const fade = setInterval(() => {
      volume += 0.02;

      if (volume >= 0.25) {
        volume = 0.25;
        clearInterval(fade);
      }

      audio.volume = volume;
    }, 100);

    return () => {
      clearInterval(fade);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return null;
}

export default BackgroundMusic;