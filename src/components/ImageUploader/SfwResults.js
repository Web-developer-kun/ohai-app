import React from "react";

const SfwResults = ({ nsfwScoreString, sfwScoreString }) => {
  return (
    <div>
      <span className="results" style={{ display: "block" }}>
        {" "}
        {sfwScoreString ? sfwScoreString + ": hit enter to send!" : ""}{" "}
      </span>
      <span className="results" style={{ display: "block" }}>
        {" "}
        {nsfwScoreString ? nsfwScoreString : ""}{" "}
      </span>
      <span className="results">
        {!nsfwScoreString.length && !sfwScoreString.length
          ? "Click the mod bot icon to scan this image"
          : ""}
      </span>
    </div>
  );
};

export default SfwResults;
