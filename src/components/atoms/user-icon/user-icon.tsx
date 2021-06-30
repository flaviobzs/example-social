import React from "react";
import { ImageComponent } from "../image";
import "./user-icon.scss";

interface Props {
  photoUrl: string | null;
}

export const UserImage = ({ photoUrl }: Props) => {
  return photoUrl !== null ? (
    <div className="gradient">
      <ImageComponent
        className="user-small-image"
        src={
          photoUrl === null
            ? "/new-assets/images/profile-no-image.svg"
            : photoUrl
        }
      />
    </div>
  ) : (
    <div>
      <ImageComponent
        className="no-user-small-image"
        src="/new-assets/images/profile-no-image.svg"
      />
    </div>
  );
};
