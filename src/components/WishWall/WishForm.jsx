import { motion } from "motion/react";
import useSendWishValidation from "../../../hooks/useSendWishValidation";

function WishForm({ formData, setFormData, onSubmit }) {
  const { errors, validate, clearError } = useSendWishValidation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validate(formData);

    if (!isValid) {
      return;
    }

    onSubmit(formData);
  };
  return (
    <motion.form
      onSubmit={handleSubmit}
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
      className="
        m-8
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
        Leave Koko a Birthday Wish ❤️
      </h2>

      <div className="mt-8 space-y-6">
        <div>
          <label className="block mb-2 font-medium text-[#4B5563]">
            Your Wish...
          </label>

          <textarea
            rows={6}
            value={formData.wish}
            onChange={(e) => {
              setFormData({
                ...formData,
                wish: e.target.value,
              });

              if (e.target.value.trim()) {
                clearError("wish");
              }
            }}
            placeholder="Write your birthday wish..."
            className={`
              w-full
              rounded-xl
              border
              border-pink-200
              p-4
              resize-none
              outline-none
              focus:ring-2
              focus:ring-pink-300

              ${
                errors.wish
                  ? "border-red-400 focus:ring-red-200"
                  : "border-pink-200 focus:ring-pink-300"
              }
            `}
          />
          {errors.wish && (
            <p className="mt-2 text-sm text-red-500">{errors.wish}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium text-[#4B5563]">
            Your Name:
          </label>

          <input
            type="text"
            value={formData.name}
            onChange={(e) => {
              setFormData({
                ...formData,
                name: e.target.value,
              });

              if (e.target.value.trim()) {
                clearError("name");
              }
            }}
            placeholder="Enter your name"
            className={`
              w-full
              rounded-xl
              border
              border-pink-200
              p-4
              outline-none
              focus:ring-2
              focus:ring-pink-300
              ${
                errors.name
                  ? "border-red-400 focus:ring-red-200"
                  : "border-pink-200 focus:ring-pink-300"
              }
            `}
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Send Wish Button */}
        <div className="flex justify-center">
          <motion.button
            type="submit"
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 4px 10px rgba(0, 0, 0, 0.1)",
                "0 8px 20px rgba(229, 107, 138, 0.25)",
                "0 4px 10px rgba(0, 0, 0, 0.1)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.08,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="
            mx-auto
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-full
            bg-white/85
            backdrop-blur-md
            border
            border-pink-200/70
            px-8
            py-3
            text-[#E56B8A]
            font-semibold
            shadow-lg
            transition-colors
            duration-300
            hover:bg-[#d85a79]
            hover:text-white
          "
          >
            💌&ensp; Send Wish
          </motion.button>
        </div>
      </div>
    </motion.form>
  );
}

export default WishForm;
