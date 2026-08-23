import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";

function useNoButton() {
  // State
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const [isAbsolute, setIsAbsolute] = useState(false);

  const [bubble, setBubble] = useState({
    visible: false,
    text: "",
  });

  const [bubblePosition, setBubblePosition] = useState({
    x: 0,
    y: 0,
  });

  const [bubbleReady, setBubbleReady] = useState(false);

  const [bubbleFadeOut, setBubbleFadeOut] =
    useState(false);

  // Refs
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const yesButtonRef = useRef(null);
  const noButtonRef = useRef(null);
  const heartRef = useRef(null);
  const bubbleRef = useRef(null);

  const homePositionRef = useRef(null);
  const isReturningRef = useRef(false);
  const fadeTimeoutRef = useRef(null);

  // Messages
  const messages = [
    "Nice try 😹",
    "C'mon, you know I Love You 🫶",
    "Stop trying to choose NO!!!!!!!!!!",
    "You only have one choice ❤️",
    "Click YES for Christ's sake 😒",
    "Click YES damn it 🙄",
    "Chuckles, Biko click YES!!!!!",
    "Dey play, Click YES OooOooO!!!!!"
  ];

  // Rectangle helpers
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

  // Calculate home position
  useEffect(() => {
    const recalcHome = () => {
      if (isAbsolute) return;

      const card = cardRef.current;
      const button = noButtonRef.current;

      if (!card || !button) return;

      const cardRect =
        card.getBoundingClientRect();

      const buttonRect =
        button.getBoundingClientRect();

      homePositionRef.current = {
        x: buttonRect.left - cardRect.left,
        y: buttonRect.top - cardRect.top,
      };
    };

    recalcHome();

    window.addEventListener(
      "resize",
      recalcHome
    );

    return () => {
      window.removeEventListener(
        "resize",
        recalcHome
      );
    };
  }, [isAbsolute]);

  // Move NO button
  const moveButton = () => {
    const card = cardRef.current;
    const noButton = noButtonRef.current;

    if (!card || !noButton) return;

    const cardRect =
      card.getBoundingClientRect();

    const buttonRect =
      noButton.getBoundingClientRect();

    const heartRect =
      heartRef.current.getBoundingClientRect();

    const safeTitle = expandRect(
      titleRef.current.getBoundingClientRect(),
      20
    );

    const safeSubtitle = expandRect(
      subtitleRef.current.getBoundingClientRect(),
      20
    );

    const safeYes = expandRect(
      yesButtonRef.current.getBoundingClientRect(),
      16
    );

    const edgeMargin = 16;
    const gap = 6;

    const heartBottomInCard = Math.max(
      0,
      heartRect.bottom - cardRect.top
    );

    const minY = Math.max(
      edgeMargin,
      heartBottomInCard + 16
    );

    const minX = edgeMargin;

    const maxX = Math.max(
      cardRect.width -
        buttonRect.width -
        edgeMargin,
      minX
    );

    const maxY = Math.max(
      cardRect.height -
        buttonRect.height -
        edgeMargin,
      minY
    );

    const zones = [
      safeTitle,
      safeSubtitle,
      safeYes,
    ];

    const overlapScore = (rect) =>
      zones.reduce(
        (count, zone) =>
          count +
          (overlaps(rect, zone) ? 1 : 0),
        0
      );

    const clampRect = (rect) => {
      const x = Math.min(
        Math.max(
          rect.left - cardRect.left,
          minX
        ),
        maxX
      );

      const y = Math.min(
        Math.max(
          rect.top - cardRect.top,
          minY
        ),
        maxY
      );

      return {
        x,
        y,
        left: cardRect.left + x,
        top: cardRect.top + y,
        right:
          cardRect.left +
          x +
          buttonRect.width,
        bottom:
          cardRect.top +
          y +
          buttonRect.height,
      };
    };

    const pushOutside = (rect, zone) => {
      if (!overlaps(rect, zone)) {
        return rect;
      }

      const pushLeft =
        rect.right - zone.left + gap;

      const pushRight =
        zone.right - rect.left + gap;

      const pushUp =
        rect.bottom - zone.top + gap;

      const pushDown =
        zone.bottom - rect.top + gap;

      const options = [
        {
          amount: pushLeft,
          dx: -pushLeft,
          dy: 0,
        },
        {
          amount: pushRight,
          dx: pushRight,
          dy: 0,
        },
        {
          amount: pushUp,
          dx: 0,
          dy: -pushUp,
        },
        {
          amount: pushDown,
          dx: 0,
          dy: pushDown,
        },
      ];

      const best = options.reduce(
        (a, b) =>
          b.amount < a.amount ? b : a
      );

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

    while (
      attempts < 100 &&
      bestScore > 0
    ) {
      attempts++;

      const x =
        minX +
        Math.random() *
          (maxX - minX);

      const y =
        minY +
        Math.random() *
          (maxY - minY);

      const candidate = clampRect({
        left: cardRect.left + x,
        top: cardRect.top + y,
        right:
          cardRect.left +
          x +
          buttonRect.width,
        bottom:
          cardRect.top +
          y +
          buttonRect.height,
      });

      const score =
        overlapScore(candidate);

      if (score < bestScore) {
        bestScore = score;
        best = candidate;
      }
    }

    if (!best) return;

    for (let pass = 0; pass < 3; pass++) {
      let stillOverlapping = false;

      for (const zone of zones) {
        if (overlaps(best, zone)) {
          best = pushOutside(
            best,
            zone
          );

          stillOverlapping = true;
        }
      }

      if (!stillOverlapping) break;
    }

    isReturningRef.current = false;

    setPosition({
      x: best.x,
      y: best.y,
    });

    setIsAbsolute(true);
  };

  // Detect pointer near NO button
  const handlePointerMove = (e) => {
    const button = noButtonRef.current;

    if (!button) return;

    const rect =
      button.getBoundingClientRect();

    const buttonCenterX =
      rect.left + rect.width / 2;

    const buttonCenterY =
      rect.top + rect.height / 2;

    const distance = Math.hypot(
      e.clientX - buttonCenterX,
      e.clientY - buttonCenterY
    );

    if (distance < 90) {
      moveButton();
    }
  };

  // Return NO button home
  const resetButtonHome = () => {
    if (!homePositionRef.current) {
      setIsAbsolute(false);
      return;
    }

    isReturningRef.current = true;

    setPosition(
      homePositionRef.current
    );
  };

  // Show bubble
  const showBubble = () => {
    const randomMessage =
      messages[
        Math.floor(
          Math.random() *
            messages.length
        )
      ];

    if (fadeTimeoutRef.current) {
      clearTimeout(
        fadeTimeoutRef.current
      );

      fadeTimeoutRef.current = null;
    }

    setBubbleReady(false);
    setBubbleFadeOut(false);

    setBubble({
      visible: true,
      text: randomMessage,
    });
  };

  // Move bubble
  const moveBubble = () => {
    const card = cardRef.current;
    const bubbleEl = bubbleRef.current;

    if (!card || !bubbleEl) return;

    const bubbleRect =
      bubbleEl.getBoundingClientRect();

    const safeCard = expandRect(
      card.getBoundingClientRect(),
      16
    );

    const vw =
      document.documentElement
        .clientWidth;

    const vh =
      document.documentElement
        .clientHeight;

    const padding = 16;

    const minX = padding;
    const minY = padding;

    const maxX = Math.max(
      vw -
        bubbleRect.width -
        padding,
      minX
    );

    const maxY = Math.max(
      vh -
        bubbleRect.height -
        padding,
      minY
    );

    let best = null;
    let bestScore = Infinity;
    let attempts = 0;

    while (
      attempts < 100 &&
      bestScore > 0
    ) {
      attempts++;

      const x =
        minX +
        Math.random() *
          (maxX - minX);

      const y =
        minY +
        Math.random() *
          (maxY - minY);

      const candidate = {
        left: x,
        top: y,
        right:
          x + bubbleRect.width,
        bottom:
          y + bubbleRect.height,
        x,
        y,
      };

      const score = overlaps(
        candidate,
        safeCard
      )
        ? 1
        : 0;

      if (score < bestScore) {
        bestScore = score;
        best = candidate;
      }
    }

    if (!best) return;

    setBubbleReady(true);

    setBubblePosition({
      x: best.x,
      y: best.y,
    });
  };

  // Bubble positioning / timeout
  useLayoutEffect(() => {
    if (!bubble.visible) return;

    requestAnimationFrame(() => {
      moveBubble();

      fadeTimeoutRef.current =
        setTimeout(() => {
          setBubbleFadeOut(true);
        }, 4000);
    });

    return () => {
      if (fadeTimeoutRef.current) {
        clearTimeout(
          fadeTimeoutRef.current
        );

        fadeTimeoutRef.current = null;
      }
    };
  }, [
    bubble.visible,
    bubble.text,
  ]);

  // NO button transition
  useEffect(() => {
    const button =
      noButtonRef.current;

    if (!button) return;

    const handleEnd = (e) => {
      if (e.propertyName !== "left") {
        return;
      }

      if (isReturningRef.current) {
        isReturningRef.current = false;
        setIsAbsolute(false);
      } else {
        showBubble();
      }
    };

    button.addEventListener(
      "transitionend",
      handleEnd
    );

    return () => {
      button.removeEventListener(
        "transitionend",
        handleEnd
      );
    };
  }, []);

  // Bubble transition
  const handleBubbleTransitionEnd = (
    e
  ) => {
    if (e.propertyName !== "opacity") {
      return;
    }

    if (!bubbleFadeOut) return;

    setBubble((current) => ({
      ...current,
      visible: false,
    }));

    resetButtonHome();
  };

  return {
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
  };
}

export default useNoButton;