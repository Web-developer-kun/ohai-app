import React from "react";
import Spinner from "./Spinner";
import Images from "./Images";
import Buttons from "./Buttons";
import SfwResults from "./SfwResults";

class Placeholder extends React.Component {
  onImageUpload = event => {
    const { onSelectImagesFromDisk } = this.props;
    const files = Array.from(event.target.files);
    const formData = new FormData();

    files.forEach((file, i) => {
      formData.append(i, file);
    });
    onSelectImagesFromDisk(formData);
  };

  scanImage = url => {
    const { setSFWScore, setNSFWScore } = this.props;
    fetch("http://localhost:3000/image-scan", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.sessionStorage.getItem("token")
      },
      body: JSON.stringify({
        url: url
      })
    })
      .then(response => response.json())
      .then(data => {
        const sfwScores = this.processClarifaiData(data);
        if (sfwScores.nsfw.score > 0.8) {
          setNSFWScore(
            sfwScores.nsfw.score * 100 +
              " %  Warning: the bot moderator thinks this is NSFW"
          );
          setSFWScore("");
        } else {
          setSFWScore(
            sfwScores.sfw.score * 100 + " % chance this image is SFW"
          );
          setNSFWScore(
            sfwScores.nsfw.score * 100 + " %  chance this image is NSFW"
          );
        }
      });
  };

  processClarifaiData = data => {
    const concepts = data.outputs[0].data.concepts;
    const results = {
      nsfw: {},
      sfw: {}
    };

    for (var i = 0; i < concepts.length; i++) {
      if (concepts[i].name === "sfw") {
        results.sfw.score = concepts[i].value;
      } else if (concepts[i].name === "nsfw") {
        results.nsfw.score = concepts[i].value;
      }
    }
    return results;
  };

  removeImage = id => {
    const { clearImageTray, setSFWScore, setNSFWScore } = this.props;
    clearImageTray([]);
    setSFWScore("");
    setNSFWScore("");
  };

  render() {
    const { uploading, images, sfwScoreString, nsfwScoreString } = this.props;
    return (
      <div>
        {uploading ? (
          <Spinner />
        ) : images !== undefined && images.length > 0 ? (
          <Images
            images={images}
            removeImage={this.removeImage}
            scanImage={this.scanImage}
            postImage={this.postImage}
            sfwScoreString={sfwScoreString}
            nsfwScoreString={nsfwScoreString}
          />
        ) : (
          <Buttons onImageUpload={this.onImageUpload} />
        )}
        <SfwResults {...this.props} />
      </div>
    );
  }
}

export default Placeholder;
