import { useState } from "react";
import { AnimatePresence } from "motion/react";

import LeaveWishButton from "./LeaveWishButton";
import WishForm from "./WishForm";

function WishWall({ onWishSubmitted }) {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    wish: "",
  });

  const handleSubmit = async (formData) => {
   try {
    await onWishSubmitted(formData);

    setFormData({
      name: "",
      wish: "",
    });

    setShowForm(false);
  } catch (error) {
    console.error("Could not submit wish:", error);
  }
};

  return (
    <>
      {!showForm && (
        <LeaveWishButton
          onClick={() => setShowForm(true)}
        />
      )}

      <AnimatePresence>
        {showForm && (
          <WishForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default WishWall;