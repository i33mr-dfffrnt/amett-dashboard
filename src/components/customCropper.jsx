import React, { useState } from "react";
import Cropper from "react-easy-crop";
// import "./styles.css";

const CustomCropper = (props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    props.showCroppedImage(croppedAreaPixels);
  };
  return (
    <div className="">
      <div className="crop-container">
        <Cropper
          image={props.image}
          crop={crop}
          zoom={zoom}
          // aspect={592 / 416}
          aspect={1 / 1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className="controls">
        <input
          type="range"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e) => {
            setZoom(e.target.value);
          }}
          className="zoom-range"
        />
      </div>
    </div>
  );
};

export default CustomCropper;
