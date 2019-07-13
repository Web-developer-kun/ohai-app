import React, { Suspense } from "react";
import SfwResults from "./SfwResults";
const Spinner = React.lazy(() => import("./Spinner"));
const Images = React.lazy(() => import("./Images"));
const Buttons = React.lazy(() => import("./Buttons"));

class ImageUploader extends React.Component {
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
    const { setSFWScore, setNSFWScore, setImageUrl } = this.props;
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
            (sfwScores.nsfw.score * 100).toFixed(2) +
              " %  Warning: the bot moderator thinks this is NSFW"
          );
          setSFWScore("");
        } else {
          setSFWScore(
            (sfwScores.sfw.score * 100).toFixed(2) +
              " % chance this image is SFW"
          );
          setNSFWScore("");
          setImageUrl(url);
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
    const {
      uploading,
      images,
      sfwScoreString,
      nsfwScoreString,
      toggleModal
    } = this.props;
    return (
      <div id="imageUploader">
        <div class="row">
          <div class="col" />
          <div class="col-md-auto">
            {uploading ? (
              <div style={{ width: "100%", height: "100%" }}>
                <Suspense fallback={<p>Spinner</p>}>
                  <Spinner />
                </Suspense>
              </div>
            ) : images !== undefined && images.length > 0 ? (
              <div style={{ width: "100%", height: "100%" }}>
                <Suspense fallback={<p>Images</p>}>
                  <Images
                    images={images}
                    removeImage={this.removeImage}
                    scanImage={this.scanImage}
                    postImage={this.postImage}
                    sfwScoreString={sfwScoreString}
                    nsfwScoreString={nsfwScoreString}
                  />
                  <SfwResults {...this.props} />
                </Suspense>
              </div>
            ) : (
              <div style={{ width: "100%", height: "100%" }}>
                <Suspense fallback={<p>Buttons</p>}>
                  <Buttons onImageUpload={this.onImageUpload} />
                </Suspense>
              </div>
            )}
            <div
              className="btn btn-sm btn-outline-light btn-block"
              onClick={() => {
                toggleModal(false);
              }}
            >
              Cancel
            </div>
          </div>
          <div className="col" />
        </div>
      </div>
    );
  }
}

export default ImageUploader;
