import React from "react";
import { ButtonComponent } from "../../atoms/button";
import { ImageComponent } from "../../atoms/image";
import "./edit-profile-form.scss";

interface Props {
  onPickedImage: (image: string) => void;
  onClickEditName: () => void;
  onClickEditUserName: () => void;
  onClickEditBio: () => void;
  data: UserDataForm;
}

interface UserDataForm {
  userImage: string;
  displayName: string | undefined;
  userName: string | undefined;
  bio: string | undefined;
  email: string | undefined;
}

export const EditProfileForm = ({
  onPickedImage,
  onClickEditBio,
  onClickEditName,
  onClickEditUserName,
  data,
}: Props) => {
  const imagePicked = async (e: any) => {
    const imageData = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(imageData);
    reader.addEventListener("load", () => {
      onPickedImage(reader.result as string);
    });
  };

  return (
    <div className="edit-profile-body">
      <div className="change-photo-div">
        <div className="image-div">
          <ImageComponent
            onClick={() => document.getElementById("input-image")?.click()}
            src={data.userImage}
            className="profile-photo"
            alt=""
            width="64"
          />
          <input
            type="file"
            id={"input-image"}
            className="file-input"
            accept="image/*,.HEIC"
            onChange={imagePicked}
          />
        </div>
        <ButtonComponent
          className="Button"
          onPress={() => document.getElementById("input-image")?.click()}
        >
          <div className="change-profile-button">Change Profile Photo</div>
        </ButtonComponent>
      </div>
      <div className="input-grid">
        <p className="input-title">Name</p>
        <input
          onClick={onClickEditName}
          className="input"
          type="text"
          placeholder="Required"
          value={data.displayName ?? undefined}
        />
        <p className="input-title">Username</p>
        <input
          onClick={onClickEditUserName}
          className="input"
          type="text"
          placeholder="Required"
          value={data.userName}
        />
        <p className="input-title">Bio</p>
        <input
          onClick={onClickEditBio}
          className="input"
          type="text"
          placeholder="Recommended"
          value={data.bio ?? undefined}
        />
        <p className="input-title">Email</p>
        <input
          className="last input"
          readOnly
          placeholder="Required"
          value={data.email ?? undefined}
        />
      </div>
    </div>
  );
};
