import Button from "../Button";
import { IoHeart } from "react-icons/io5";

function LoveButtons({
  yesButtonRef,
  noButtonRef,
  position,
  isAbsolute,
  onNoClick,
  onYesClick,
}) {
  return (
    <div className="mt-8 flex justify-center items-center gap-4">
      <Button
        ref={yesButtonRef}
        onClick={onYesClick}
        className="
          relative
          z-20
          bg-white
          border-2
          border-[#E56B8A]
          text-[#4A5D7A]
          font-bold
          rounded-xl
          px-3
          py-1
          flex
          items-center
          gap-2
          animate-glow
        "
      >
        YES

        <IoHeart
          className="
            text-xl
            text-red-500
            animate-heartbeat
            drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]
          "
        />
      </Button>

      <div
        ref={noButtonRef}
        className={`
          inline-block
          rounded-xl
          transition-all
          duration-500
          ease-out
          z-10
          ${isAbsolute ? "absolute" : ""}
        `}
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
          onPointerDown={onNoClick}
          className="
            bg-white
            border-2
            border-[#E56B8A]
            text-[#4A5D7A]
            font-bold
            rounded-xl
            px-4
            py-1
            text-lg
          "
        >
          NO
        </button>
      </div>
    </div>
  );
}

export default LoveButtons;