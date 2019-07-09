import React from "react";

const SfwResults = ({ nsfwScoreString, sfwScoreString }) => {
  return (
    <div>
      <span style={{ display: "block" }}>
        {" "}
        {sfwScoreString ? sfwScoreString : ""}{" "}
      </span>
      <span style={{ display: "block" }}>
        {" "}
        {nsfwScoreString ? nsfwScoreString : ""}{" "}
      </span>
    </div>
  );
};

export default SfwResults;
