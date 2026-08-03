import { forwardRef } from "react";

const Button = forwardRef(function Button(
  { children, className = "", ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      className={`inline-flex items-center justify-center gap-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;