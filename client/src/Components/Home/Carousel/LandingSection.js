import React from "react";

const LandingSection = () => {
  return (
    <div>
      <div
        style={{
          paddingTop: "1rem",
          float: "right",
          fontWeight: "800",
          fontSize: "24px",
          color: "#606D5D",
          opacity: 0.7,
        }}
      >
        <div>Your Vet Clinic.</div> <div> Redefined. </div>
      </div>
      <img
        style={{
          transform: "scale(0.7)",
        }}
        src="./images/medicine.svg"
      />
    </div>
  );
};

export default LandingSection;
