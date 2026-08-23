function LoveBubble({
  bubble,
  bubbleRef,
  bubblePosition,
  bubbleReady,
  bubbleFadeOut,
  onTransitionEnd,
}) {
  if (!bubble.visible) return null;

  return (
    <div
      ref={bubbleRef}
      onTransitionEnd={onTransitionEnd}
      className="
        fixed
        rounded-full
        bg-white
        px-4
        py-2
        text-[#4A5D7A]
        shadow-lg
        z-20
        transition-opacity
        duration-500
        ease-out
        animate-glow
      "
      style={{
        left: bubblePosition.x,
        top: bubblePosition.y,
        opacity:
          bubbleReady && !bubbleFadeOut
            ? 1
            : 0,
        pointerEvents: "none",
      }}
    >
      {bubble.text}
    </div>
  );
}

export default LoveBubble;