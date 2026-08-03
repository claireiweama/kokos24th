import Button from "./components/Button";
import { IoHeart } from "react-icons/io5";
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import HeartsBackground from "./components/HeartsBackground";



function App() {
  // State
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isAbsolute, setIsAbsolute] = useState(false);
  const [bubble, setBubble] = useState({ visible: false, text: "" });
  const [bubblePosition, setBubblePosition] = useState({ x: 0, y: 0 });
  const [bubbleReady, setBubbleReady] = useState(false);
  const [bubbleFadeOut, setBubbleFadeOut] = useState(false);

  const messages = [
    "Nice try 😹",
    "C'mon, you know I Love You 🫶",
    "Stop trying to choose NO!!!!!!!!!!",
    "You only have one choice ❤️",
    "Click YES for Christ's sake 😒",
    "Click YES damn it 🙄",
  ];


  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const yesButtonRef = useRef(null);
  const noButtonWrapperRef = useRef(null);
  const heartRef = useRef(null);
  const bubbleRef = useRef(null);


  const navigate = useNavigate();

  
  const homePositionRef = useRef(null);
  const isReturningRef = useRef(false);
  const fadeTimeoutRef = useRef(null);


  
  useEffect(() => {
    const recalcHome = () => {
      if (isAbsolute) return;

      const card = cardRef.current;
      const wrapper = noButtonWrapperRef.current;
      if (!card || !wrapper) return;

      const cardRect = card.getBoundingClientRect();
      const wrapperRect = wrapper.getBoundingClientRect();

      homePositionRef.current = {
        x: wrapperRect.left - cardRect.left,
        y: wrapperRect.top - cardRect.top,
      };
    };

    recalcHome();

    window.addEventListener("resize", recalcHome);
    return () => window.removeEventListener("resize", recalcHome);
  }, [isAbsolute]);


  const overlaps = (a, b) =>
    !(
      a.right < b.left ||
      a.left > b.right ||
      a.bottom < b.top ||
      a.top > b.bottom
    );

  const expandRect = (rect, amount) => ({
    left: rect.left - amount,
    right: rect.right + amount,
    top: rect.top - amount,
    bottom: rect.bottom + amount,
  });

  const moveBubble = () => {
  const card = cardRef.current;
  const bubbleEl = bubbleRef.current;
  if (!card || !bubbleEl) return;

  const bubbleRect = bubbleEl.getBoundingClientRect();
  const safeCard = expandRect(card.getBoundingClientRect(), 16);

  const vw = document.documentElement.clientWidth;
  const vh = document.documentElement.clientHeight;
  const padding = 16; 

  const minX = padding;
  const minY = padding;
  const maxX = Math.max(vw - bubbleRect.width - padding, minX);
  const maxY = Math.max(vh - bubbleRect.height - padding, minY);

  let best = null;
  let bestScore = Infinity;
  let attempts = 0;

  while (attempts < 100 && bestScore > 0) {
    attempts++;

    const x = minX + Math.random() * (maxX - minX);
    const y = minY + Math.random() * (maxY - minY);

    const candidate = {
      left: x,
      top: y,
      right: x + bubbleRect.width,
      bottom: y + bubbleRect.height,
      x,
      y,
    };

    const score = overlaps(candidate, safeCard) ? 1 : 0;

    if (score < bestScore) {
      bestScore = score;
      best = candidate;
    }
  }

  setBubbleReady(true);
  setBubblePosition({ x: best.x, y: best.y });
};

  const handlePointerMove = (e) => {
    const button = noButtonWrapperRef.current;

    if (!button) return;

    const rect = button.getBoundingClientRect();

    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    const distance = Math.hypot(
      e.clientX - buttonCenterX,
      e.clientY - buttonCenterY,
    );

    if (distance < 90) {
      moveButton();
    }
  };

  const moveButton = () => {
  const card = cardRef.current;
  const noWrapper = noButtonWrapperRef.current;
  if (!card || !noWrapper) return;

  const cardRect = card.getBoundingClientRect();
  const btnRect = noWrapper.getBoundingClientRect();
  const heartRect = heartRef.current.getBoundingClientRect();

  const safeTitle = expandRect(titleRef.current.getBoundingClientRect(), 20);
  const safeSubtitle = expandRect(subtitleRef.current.getBoundingClientRect(), 20);
  const safeYes = expandRect(yesButtonRef.current.getBoundingClientRect(), 16);

  const edgeMargin = 16;
  const gap = 6; 

  const heartBottomInCard = Math.max(0, heartRect.bottom - cardRect.top);
  const minY = Math.max(edgeMargin, heartBottomInCard + 16);
  const minX = edgeMargin;

  const maxX = Math.max(cardRect.width - btnRect.width - edgeMargin, minX);
  const maxY = Math.max(cardRect.height - btnRect.height - edgeMargin, minY);

  const zones = [safeTitle, safeSubtitle, safeYes];
  const overlapScore = (rect) =>
    zones.reduce((count, zone) => count + (overlaps(rect, zone) ? 1 : 0), 0);

  const clampRect = (rect) => {
    let x = Math.min(Math.max(rect.left - cardRect.left, minX), maxX);
    let y = Math.min(Math.max(rect.top - cardRect.top, minY), maxY);
    return {
      x,
      y,
      left: cardRect.left + x,
      top: cardRect.top + y,
      right: cardRect.left + x + btnRect.width,
      bottom: cardRect.top + y + btnRect.height,
    };
  };

  const pushOutside = (rect, zone) => {
    if (!overlaps(rect, zone)) return rect;

    const pushLeft = rect.right - zone.left + gap;   // move rect left
    const pushRight = zone.right - rect.left + gap;  // move rect right
    const pushUp = rect.bottom - zone.top + gap;      // move rect up
    const pushDown = zone.bottom - rect.top + gap;    // move rect down

    const options = [
      { amount: pushLeft, dx: -pushLeft, dy: 0 },
      { amount: pushRight, dx: pushRight, dy: 0 },
      { amount: pushUp, dx: 0, dy: -pushUp },
      { amount: pushDown, dx: 0, dy: pushDown },
    ];

    const best = options.reduce((a, b) => (b.amount < a.amount ? b : a));

    return clampRect({
      left: rect.left + best.dx,
      top: rect.top + best.dy,
      right: rect.right + best.dx,
      bottom: rect.bottom + best.dy,
    });
  };

  let best = null;
  let bestScore = Infinity;
  let attempts = 0;

  while (attempts < 100 && bestScore > 0) {
    attempts++;
    const x = minX + Math.random() * (maxX - minX);
    const y = minY + Math.random() * (maxY - minY);

    const candidate = clampRect({
      left: cardRect.left + x,
      top: cardRect.top + y,
      right: cardRect.left + x + btnRect.width,
      bottom: cardRect.top + y + btnRect.height,
    });

    const score = overlapScore(candidate);
    if (score < bestScore) {
      bestScore = score;
      best = candidate;
    }
  }

  for (let pass = 0; pass < 3; pass++) {
    let stillOverlapping = false;
    for (const zone of zones) {
      if (overlaps(best, zone)) {
        best = pushOutside(best, zone);
        stillOverlapping = true;
      }
    }
    if (!stillOverlapping) break;
  }

  isReturningRef.current = false;
  setPosition({ x: best.x, y: best.y });
  setIsAbsolute(true);
};

  const resetButtonHome = () => {
    if (!homePositionRef.current) {
      setIsAbsolute(false);
      return;
    }
    isReturningRef.current = true;
    setPosition(homePositionRef.current);
  };

  const showBubble = () => {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = null;
    }

    setBubbleReady(false);
    setBubbleFadeOut(false);
    setBubble({
      visible: true,
      text: randomMessage,
    });
  };

  useLayoutEffect(() => {
    if (!bubble.visible) return;

    requestAnimationFrame(() => {
      moveBubble();

      fadeTimeoutRef.current = setTimeout(() => {
        setBubbleFadeOut(true);
      }, 4000);
    });

    return () => {
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
        fadeTimeoutRef.current = null;
      }
    };
  }, [bubble.visible, bubble.text]);

  useEffect(() => {
    const button = noButtonWrapperRef.current;

    if (!button) return;

    const handleEnd = (e) => {
      if (e.propertyName !== "left") return;

      if (isReturningRef.current) {
        isReturningRef.current = false;
        setIsAbsolute(false);
      } else {
        showBubble();
      }
    };

    button.addEventListener("transitionend", handleEnd);

    return () => {
      button.removeEventListener("transitionend", handleEnd);
    };
  }, []);



  const handleBubbleTransitionEnd = (e) => {
    if (e.propertyName !== "opacity") return;
    if (!bubbleFadeOut) return;

    setBubble((v) => ({ ...v, visible: false }));
    resetButtonHome();
  };

  return (
    <>
      <HeartsBackground avoidRef={cardRef} />

      {bubble.visible && (
        <div
          ref={bubbleRef}
          onTransitionEnd={handleBubbleTransitionEnd}
          className="fixed rounded-full bg-white px-4 py-2 text-[#1560BD] shadow-lg z-20 transition-opacity duration-500 ease-out animate-glow"
          style={{
            left: bubblePosition.x,
            top: bubblePosition.y,
            opacity: bubbleReady && !bubbleFadeOut ? 1 : 0,
            pointerEvents: "none",
          }}
        >
          {bubble.text}
        </div>
      )}

      <div className="overflow-hidden flex justify-center items-center h-dvh p-4 ">
        <div className="w-full max-w-2xl justify-center">
          <div
            ref={cardRef}
            onPointerMove={handlePointerMove}
            className="relative z-10 bg-white flex flex-col items-center rounded-xl shadow-xl pt-10 pb-8 px-6 sm:px-8"
          >
            <div
              ref={heartRef}
              className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white px-2"
            >
              <IoHeart className="text-5xl text-red-500" />
            </div>

            <h1
              ref={titleRef}
              className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#4A5D7A] text-center"
            >
              Do you know I Love You?
            </h1>
            <p
              ref={subtitleRef}
              className="text-xs sm:text-sm md:text-base text-[#E56B8A] pt-2 text-center"
            >
              Don't you dare click NO!!!
            </p>
            <div className="mt-8 flex justify-center items-center gap-4">
              <Button
                ref={yesButtonRef}
                onClick={() => navigate("/MainPage")}
                className="relative z-20 bg-white border-2 border-[#E56B8A] text-[#4A5D7A] font-bold rounded-xl px-3 py-1 flex items-center gap-2 animate-glow"
              >
                YES
                <IoHeart className="text-xl text-red-500 animate-heartbeat drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
              </Button>

              <div
                ref={noButtonWrapperRef}
                className={`inline-block rounded-xl transition-all duration-500 ease-out z-10 ${
                  isAbsolute ? "absolute" : ""
                }`}
                style={
                  isAbsolute
                    ? {
                        left: position.x,
                        top: position.y,
                      }
                    : undefined
                }
              >
                <button
                  onPointerDown={moveButton}
                  className="bg-white border-2 border-[#E56B8A] text-[#4A5D7A] font-bold rounded-xl px-4 py-1 text-lg"
                >
                  NO
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;