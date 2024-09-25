import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

const Button = ({
  label = "Submit",
  onClick,
  type = "button",
  size = "medium",
  variant = "primary",
  disabled = false,
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      type={type}
      onClick={disabled ? undefined : onClick} // Disable onClick when disabled
      disabled={disabled}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf(["primary", "secondary", "danger", "success"]),
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  label: "Submit",
  type: "button",
  size: "medium",
  variant: "primary",
  disabled: false,
  onClick: () => {},
};

export default Button;
