import React from "react";
import { ButtonComponent } from "../button";
import { ImageComponent } from "../image";
import "./brand.scss";

interface Props {
  brandTitle: string;
  brandImg: string;
  className?: string;
}

export const Brand = ({ brandImg, brandTitle, className }: Props) => {
  return (
    <ButtonComponent className={"brand " + className} onPress={() => {}}>
      <ImageComponent className="brand-image" src={brandImg} />
      <strong className="brand-title">{brandTitle}</strong>
    </ButtonComponent>
  );
};
