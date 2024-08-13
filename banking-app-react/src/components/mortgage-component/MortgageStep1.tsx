import React, { useState } from "react";
import "./MortgageStep1.css";
import { FcCheckmark } from "react-icons/fc";

const MortgageStep1 = () => {
  const [mortgageSelected, setMortgageSelected] = useState<boolean>(false);
  const [buttonLogo, setButtonLogo] = useState<string>("Add");
  return (
    <>
      <div className="box-container">
        <div className="abc">
          <h1>Mortgage</h1>
          <p>6.49% for 5 year fixed rate</p>
          <p>
            When you're buying a new home or refinancing, we'll help you get the
            rate and term that works for you.
          </p>
          <button
            className="btn btn-outline-primary mx-2 shadow-sm"
            onClick={() => {
              setMortgageSelected(!mortgageSelected);
              if (buttonLogo === "Add") {
                setButtonLogo("Remove");
              } else {
                setButtonLogo("Add");
              }
            }}
          >
            {buttonLogo}
          </button>
        </div>
      </div>
      {mortgageSelected && (
        <div
          className="box-container"
          style={{
            position: "absolute",
            bottom: "2rem",
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "18rem",
          }}
        >
          <p>
            <FcCheckmark style={{ marginRight: "0.5rem" }} />
            item selected
          </p>
          <button className="btn btn-outline-primary mx-2 shadow-sm">
            Continue
          </button>
        </div>
      )}
    </>
  );
};

export default MortgageStep1;
