function LeaveWishButton({ onClick }) {
  return (
    <div className="flex justify-center mt-10">
      <button
        onClick={onClick}
        className="
          rounded-full
          bg-[#E56B8A]
          px-8
          py-3
          text-white
          font-semibold
          shadow-lg
          hover:scale-105
          hover:bg-[#d85a79]
          transition-all
          duration-300
        "
      >
        💌 Leave a Wish
      </button>
    </div>
  );
}

export default LeaveWishButton;