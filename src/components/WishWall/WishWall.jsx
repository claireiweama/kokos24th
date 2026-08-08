import { useState } from "react";
import { AnimatePresence } from "motion/react";

import LeaveWishButton from "./LeaveWishButton";
import WishForm from "./WishForm";

function WishWall() {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    wish: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    setFormData({
      name: "",
      wish: "",
    });

    setShowForm(false);
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