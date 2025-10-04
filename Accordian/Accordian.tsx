import React from "react";

const Accordian = React.memo(
  ({ isActive, title, description, id, toggleAccordian }) => {
    return (
      <div style={{ backgroundColor: "pink" }}>
        <p onClick={() => toggleAccordian(id)}>{isActive ? "-" : "+"}</p>
        <p>{title}</p>
        {isActive && <p>{description}</p>}
      </div>
    );
  }
);

export default Accordian;
