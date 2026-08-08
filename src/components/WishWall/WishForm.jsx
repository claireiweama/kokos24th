import { motion } from "motion/react";

function WishForm({
  formData,
  setFormData,
  onSubmit,
}) {
  return (
    <motion.form
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 40,
      }}
      transition={{
        duration: 0.35,
      }}
      onSubmit={onSubmit}
      className="
        mt-8
        mx-auto
        w-[90%]
        max-w-2xl

        rounded-3xl
        bg-white/80
        backdrop-blur-md
        border
        border-pink-200
        shadow-xl

        p-8
      "
    >
      <h2 className="text-center text-2xl font-bold text-[#4A5D7A]">
        Leave a Birthday Wish 💕
      </h2>

      <div className="mt-8 space-y-6">

        <div>
          <label className="block mb-2 font-medium">
            Your Name
          </label>

          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            placeholder="Enter your name"
            className="
              w-full
              rounded-xl
              border
              border-pink-200
              p-4
              outline-none
              focus:ring-2
              focus:ring-pink-300
            "
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Your Wish
          </label>

          <textarea
            rows={6}
            value={formData.wish}
            onChange={(e) =>
              setFormData({
                ...formData,
                wish: e.target.value,
              })
            }
            placeholder="Write your birthday wish..."
            className="
              w-full
              rounded-xl
              border
              border-pink-200
              p-4
              resize-none
              outline-none
              focus:ring-2
              focus:ring-pink-300
            "
          />
        </div>

        <button
          className="
            w-full
            rounded-xl
            bg-[#E56B8A]
            py-4
            font-semibold
            text-white
            hover:brightness-110
          "
        >
          Send Wish 💌
        </button>

      </div>
    </motion.form>
  );
}

export default WishForm;