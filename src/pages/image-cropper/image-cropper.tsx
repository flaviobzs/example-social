import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop/types";
import { ButtonComponent } from "../../component/atoms/button";
import { toBlob } from "../../utils/cropImage";
import "./image-cropper.scss";
import "../../../scss/header.scss";
interface Props {
  image?: string;
  onCancel: () => void;
  onSave: (imgBlob: Blob | null) => void;
  cropShape: "round" | "rect";
}

export const ImageCropper = ({
  image,
  onCancel,
  onSave,
  cropShape = "round",
}: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);

  const savePressed = () => {
    toBlob(image, croppedArea).then((blob: Blob | null) => {
      onSave(blob);
    });
  };

  const onCropComplete = (
    croppedAreaPercentage: Area,
    croppedAreaPixels: Area
  ) => {
    setCroppedArea(croppedAreaPixels);
  };

  return (
    <div className="image-cropper-container">
      <div className="header image-cropper-header">
        <ButtonComponent className="cancel Button" onPress={onCancel}>
          Cancel
        </ButtonComponent>
        <div></div>
        <ButtonComponent className="save Button" onPress={savePressed}>
          Save
        </ButtonComponent>
      </div>
      <div className="image-cropper-container-cropper">
        <div className="cropper">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            cropShape={cropShape}
            onCropComplete={onCropComplete}
          />
        </div>
      </div>
    </div>
  );
};
