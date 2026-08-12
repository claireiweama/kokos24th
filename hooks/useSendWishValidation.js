import { useState } from "react";

function sendWishValidation() {
  const [errors, setErrors] = useState({
    wish: "",
    name: "",
  });

  const validate = (formData) => {
    const newErrors = {
      wish: "",
      name: "",
    };

    if (!formData.wish.trim()) {
      newErrors.wish = "Your wish cannot be empty.";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Your name cannot be empty.";
    }

    setErrors(newErrors);

    return !newErrors.wish && !newErrors.name;
  };

  const clearError = (field) => {
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  return {
    errors,
    validate,
    clearError,
  };
}

export default sendWishValidation;