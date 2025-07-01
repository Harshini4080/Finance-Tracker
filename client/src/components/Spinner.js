import React from "react";

/**
 * Spinner Component
 * Displays a centered loading spinner using Bootstrap classes.
 */
const Spinner = () => {
  return (
    <div className="d-flex justify-content-center">
      {/* Bootstrap Spinner */}
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
