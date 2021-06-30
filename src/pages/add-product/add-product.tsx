import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ButtonComponent } from "../../component/atoms/button";
import { ImageComponent } from "../../component/atoms/image";
import { useAddFavouriteContext } from "../../context/create-favourite-context";
import { getSuggestImages } from "../../firebase/firestore/brand";
import { ImageCropper } from "../image-cropper";
import "./add-product.scss";
import "../../../scss/header.scss";

interface Props {}

export const AddProduct = () => {
  const { product, choosenImage, setChoosenImage } = useAddFavouriteContext();

  const history = useHistory();
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<Blob | null>(() =>
    choosenImage instanceof Blob ? choosenImage : null
  );

  const [suggestImages, setSuggestImages] = useState<string[]>([]);
  const [curSelectedIndex, setCurSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    getSuggestImages(product!.id).then((val) => {
      if (typeof choosenImage === "string") {
        const index = val.indexOf(choosenImage);
        setCurSelectedIndex(index);
      } else if (typeof choosenImage === "undefined") {
        setCurSelectedIndex(0);
      }
      setSuggestImages(val);
    });
  }, [product, choosenImage]);

  const onPickedImage = (e: any) => {
    const imageData = e.target.files[0];
    setPickedImage(URL.createObjectURL(imageData));
    setCurSelectedIndex(null);
  };

  const renderedSuggestedImages = () => {
    const components = suggestImages.map((el, index) => {
      const onClickImage = () => {
        setCurSelectedIndex(index);
        setPickedImage(null);
        setCroppedImage(null);
      };
      return (
        <div className="image-to-choose">
          {curSelectedIndex !== index ? (
            <ImageComponent
              onClick={onClickImage}
              src={el}
              className="image-to-choose"
              alt=""
            />
          ) : (
            <div className="gradient">
              <ImageComponent src={el} className="small-chosen-image" alt="" />
              <ImageComponent
                src="/new-assets/images/chosen-photo-image.svg"
                className="chosen-photo-marker"
                alt=""
              />
            </div>
          )}
        </div>
      );
    });
    return components;
  };

  const onPressNextButton = () => {
    //TODO: refactoring, remove duplicate method here
    const imageFunc = () => {
      if (croppedImage !== null) {
        return croppedImage;
      }
      if (curSelectedIndex !== null) {
        return suggestImages[curSelectedIndex];
      }
      return undefined;
    };
    const image = imageFunc();
    if (image === undefined) {
      return;
    }
    setChoosenImage(image);
    history.push("/add-product-final");
  };

  const chosenImageFunction = () => {
    if (croppedImage !== null) {
      return URL.createObjectURL(croppedImage);
    }
    if (curSelectedIndex !== null) {
      return suggestImages[curSelectedIndex];
    }
    return undefined;
  };
  const chosenImage = chosenImageFunction();

  //TODO: Refactoring
  if (pickedImage !== null) {
    return (
      <ImageCropper
        image={pickedImage}
        onCancel={() => setPickedImage(null)}
        onSave={(image) => {
          setCroppedImage(image);
          setPickedImage(null);
        }}
        cropShape={"rect"}
      />
    );
  }

  const onPressBack = () => {
    setChoosenImage(undefined);
    history.goBack();
  };

  return (
    <div>
      <div className="header bordered-header">
        <ButtonComponent className="back Button" onPress={onPressBack}>
          <ImageComponent
            src="/new-assets/images/back.svg"
            className={"choosen-image"}
          />
        </ButtonComponent>
        <div className="header-title">Add Image</div>
        <ButtonComponent className="next Button" onPress={onPressNextButton}>
          Next
        </ButtonComponent>
      </div>
      <div className="add-image-container">
        {chosenImage ? (
          <ImageComponent className="chosen-image" src={chosenImage} />
        ) : (
          <div></div>
        )}
        <div className="images-to-choose">
          <div
            onClick={() => {
              document.getElementById("image-input")?.click();
            }}
            className="input-div image-to-choose"
          >
            <img
              src="/new-assets/images/camera-image.svg"
              className="no-input-image"
              alt=""
            />
            <input
              type="file"
              id={"image-input"}
              onChange={onPickedImage}
              className="file-input"
              accept="image/*,.HEIC"
            />
          </div>
          {renderedSuggestedImages()}
        </div>
      </div>
    </div>
  );
};
