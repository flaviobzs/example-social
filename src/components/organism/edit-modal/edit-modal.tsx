import React from "react";
import { ImageComponent } from "../../atoms/image";
import { LabelComponent } from "../../atoms/label";
import "./sign-up-button.scss";

interface Props {
  onClick: (() => void) | undefined;
  imgSrc: string;
  title: string;
}

export const SignUpButton = ({ onClick, imgSrc, title }: Props) => {
  return (
    <div className="sign-up-button-container" onClick={onClick}>
      <ImageComponent src={imgSrc} className="image" />
      <LabelComponent className="label">{title}</LabelComponent>
    </div>
  );
};
