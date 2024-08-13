import React from "react";
import { Button, Card } from "react-bootstrap";
import "./InsuranceOption.css";

interface InsuranceOptionProps {
  title: string;
  imageSrc: string;
  navigateTo: () => void;
  description: string;
  alignItems: string;
  hasList: boolean;
  insurancePerils?: Array<string>;
  descriptionTextAlign: string;
}

const InsuranceOption: React.FC<InsuranceOptionProps> = ({
  title,
  imageSrc,
  navigateTo,
  description,
  alignItems,
  hasList,
  insurancePerils,
  descriptionTextAlign,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: alignItems,
      }}
    >
      <b
        style={{
          textAlign: "center",
          color: "#555555",
          alignSelf: "left",
          fontSize: "2rem",
          borderBottom: "4px solid #F28500",
          paddingBottom: "0.25rem",
          display: "inline-block",
        }}
      >
        {title}
      </b>
      <Card
        className="shadow"
        style={{
          width: "60%",
          padding: "2%",
          margin: "2%",
          border: "solid 1px #000000",
          borderRadius: "5%",
        }}
      >
        <Card.Body
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            position: "relative",
          }}
        >
          <p
            style={{
              textAlign: descriptionTextAlign,
              color: "#555555",
              alignSelf: "center",
            }}
          >
            {description}
            {hasList && (
              <ul className="perilsList">
                {insurancePerils.map((peril, index) => (
                  <li key={index}>{peril}</li>
                ))}
              </ul>
            )}
          </p>

          <Button
            className="btn btn-outline-primary mx-2 shadow-sm"
            variant="primary"
            style={{ background: "#F28500", borderColor: "#F28500" }}
            onClick={navigateTo}
          >
            Start Quote
          </Button>
          <img
            src={imageSrc}
            alt={`${title} Image`}
            style={{
              position: "absolute",
              top: -50,
              right: -50,
              width: "70px",
              height: "70px",
            }}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default InsuranceOption;
