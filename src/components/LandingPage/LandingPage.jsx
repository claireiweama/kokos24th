import { useNavigate } from "react-router-dom";

import HeartsBackground from "../HeartsBackground";
import LoveCard from "./LoveCard";
import LoveBubble from "./LoveBubble";
import useNoButton from "./useNoButton";

function LandingPage() {
  const navigate = useNavigate();

  const {
    cardRef,
    titleRef,
    subtitleRef,
    yesButtonRef,
    noButtonRef,
    heartRef,
    bubbleRef,

    position,
    isAbsolute,

    bubble,
    bubblePosition,
    bubbleReady,
    bubbleFadeOut,

    handlePointerMove,
    moveButton,
    handleBubbleTransitionEnd,
  } = useNoButton();

  return (
    <>
      <HeartsBackground
        avoidRef={cardRef}
      />

      <LoveBubble
        bubble={bubble}
        bubbleRef={bubbleRef}
        bubblePosition={bubblePosition}
        bubbleReady={bubbleReady}
        bubbleFadeOut={bubbleFadeOut}
        onTransitionEnd={
          handleBubbleTransitionEnd
        }
      />

      <div className="overflow-hidden flex justify-center items-center h-dvh p-4">
        <LoveCard
          cardRef={cardRef}
          titleRef={titleRef}
          subtitleRef={subtitleRef}
          heartRef={heartRef}
          yesButtonRef={yesButtonRef}
          noButtonRef={noButtonRef}
          position={position}
          isAbsolute={isAbsolute}
          onPointerMove={handlePointerMove}
          onNoClick={moveButton}
          onYesClick={() => navigate("/MainPage")}
        />
      </div>
    </>
  );
}

export default LandingPage;