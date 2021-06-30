import React from "react";
import "./tag.scss";
import { ButtonComponent } from "../../atoms/button";

interface Props {
  text: string;
}

export const Tag = ({ text }: Props) => {
  return (
    <ButtonComponent className="tag-container" onPress={() => {}}>
      <strong>#</strong>
      {text.toLowerCase()}
    </ButtonComponent>
  );
};
