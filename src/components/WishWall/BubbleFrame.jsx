function BubbleFrame({ children }) {
  return (
    <div
      className="
        mx-auto
        w-[90%]
        sm:w-[80%]
        md:w-[70%]
        lg:w-[60%]
        xl:w-[50%]

        border-1
        border-[#E56B8A]

        rounded-3xl

        bg-white/80
        backdrop-blur-md

        px-6
        py-8
        mb-8
        sm:px-8
        sm:py-10
        md:px-12
        md:py-12

        shadow-lg
      "
    >
      {children}
    </div>
  );
}

export default BubbleFrame;