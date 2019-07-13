import React from "react";

class SfwResults extends React.Component {
  render() {
    const { sfwScoreString, nsfwScoreString, toggleModal } = this.props;
    return (
      <div>
        <div className="results">
          {" "}
          {sfwScoreString ? (
            <div>
              <span>{sfwScoreString}</span>
              <div
                onClick={() => {
                  toggleModal(false);
                }}
                className="btn btn-sm btn-outline-light btn-block"
              >
                Get back to chat
              </div>
            </div>
          ) : (
            ""
          )}{" "}
          <div className="results">
            {" "}
            {nsfwScoreString ? nsfwScoreString : ""}{" "}
          </div>
        </div>
      </div>
    );
  }
}

export default SfwResults;
