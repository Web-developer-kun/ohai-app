import React from "react";

class SfwResults extends React.Component {
  writeMessage = event => {
    const { onInputFieldChange } = this.props;
    onInputFieldChange(event.target.value);
  };

  render() {
    const {
      sfwScoreString,
      nsfwScoreString,
      toggleModal,
      setImageUrl
    } = this.props;
    return (
      <div>
        <div className="results" style={{ display: "block" }}>
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
                Attach to Next Post
              </div>
            </div>
          ) : (
            ""
          )}{" "}
          <div className="results" style={{ display: "block" }}>
            {" "}
            {nsfwScoreString ? nsfwScoreString : ""}{" "}
          </div>
        </div>
      </div>
    );
  }
}

export default SfwResults;
