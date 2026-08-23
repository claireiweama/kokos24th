import { IoHeart } from "react-icons/io5";
import LoveButtons from "./LoveButtons";

function LoveCard({
  cardRef,
  titleRef,
  subtitleRef,
  heartRef,
  yesButtonRef,
  noButtonRef,
  position,
  isAbsolute,
  onPointerMove,
  onNoClick,
  onYesClick,
}) {
  return (
    <div
      ref={cardRef}
      onPointerMove={onPointerMove}
      className="
        relative
        z-10
        bg-white
        flex
        flex-col
        items-center
        rounded-xl
        shadow-xl
        pt-10
        pb-8
        px-6
        sm:px-8
      "
    >
      <div
        ref={heartRef}
        className="
          absolute
          -top-6
          left-1/2
          -translate-x-1/2
          bg-white
          px-2
        "
      >
        <IoHeart className="text-5xl text-red-500" />
      </div>

      <h1
        ref={titleRef}
        className="
          text-lg
          sm:text-2xl
          md:text-3xl
          lg:text-4xl
          font-bold
          text-[#4A5D7A]
          text-center
        "
      >
        Do you know I Love You?
      </h1>

      <p
        ref={subtitleRef}
        className="
          italic
          text-xs
          sm:text-sm
          md:text-base
          text-[#E56B8A]
          pt-2
          text-center
        "
      >
        Don't you dare click NO!!!
      </p>

      <LoveButtons
        yesButtonRef={yesButtonRef}
        noButtonRef={noButtonRef}
        position={position}
        isAbsolute={isAbsolute}
        onNoClick={onNoClick}
        onYesClick={onYesClick}
      />
    </div>
  );
}

export default LoveCard;