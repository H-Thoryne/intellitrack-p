import React from "react";
import spinnerImg from "../../img/spinner.gif";

const Spinner = () => {
  return (
    <div>
      <img
        src={spinnerImg}
        alt="A tartalom töltődik..."
        style={{ width: "100px", height: "100px" }}
      />
    </div>
  );
};

export default Spinner;
