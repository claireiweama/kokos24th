import {
  thingsiLoveAboutYou,
  wishesFromLovedOnes,
} from "../data/thingsILoveAboutYou";

export function MobileSlider() {
  return (
    <div className="md:hidden space-y-16 pt-10">
      {thingsiLoveAboutYou.map((note) => (
        <div
          key={note.id}
          className="flex flex-col items-center gap-6 px-6"
        >
          <img
            src={note.image}
            alt={note.title}
            className="w-full max-w-sm rounded-xl shadow-lg"
          />

          <div className="text-center">
            <h2 className="text-3xl font-semibold text-[#4A5D7A] mb-4">
              {note.title}
            </h2>

            <p className="text-lg text-[#4B5563] leading-8">
              {note.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function MobileWishSlider() {
  return (
    <div className="md:hidden space-y-16 pt-10">
      {wishesFromLovedOnes.map((wish) => (
        <div
          key={wish.id}
          className="flex flex-col items-center gap-6 px-6"
        >
          <img
            src={wish.image}
            alt={wish.name}
            className="w-full max-w-sm rounded-xl shadow-lg"
          />

          <div className="text-center">
            <h2 className="text-3xl font-semibold text-[#4A5D7A] mb-4">
              {wish.name}
            </h2>

            <p className="text-lg text-[#4B5563] leading-8">
              {wish.wish}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}