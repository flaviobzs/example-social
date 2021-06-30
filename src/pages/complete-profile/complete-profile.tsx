import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { EditModal, InputProps } from "../../component/organism/edit-modal";
import { EditProfileForm } from "../../component/organism/edit-profile-form";
import { ImageCropper } from "../image-cropper";
import { userConverter } from "../../models/user";
import { useAppDispatch } from "../../redux/store";
import { completeUser } from "../../redux/auth-reducer";
import { unwrapResult } from "@reduxjs/toolkit";
import "./complete-profile.scss";
import "../../../scss/header.scss";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/selectors";
import { userNameValidator } from "../../utils/validator";

interface Props {}

export const CompleteProfile = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const user = useSelector(getUser)!;

  const [modalProps, setModalProps] = useState<InputProps | null>(null);
  const [pickedImage, setPickedImage] = useState<string | undefined>(undefined);
  const [croppedImage, setCropperImage] = useState<Blob | null>(null);
  const [userData, setUserData] = useState(() =>
    userConverter.toUserInfo(user)
  );
  const userCanComplete =
    userData.displayName !== undefined &&
    userData.email !== undefined &&
    userData.username !== undefined;

  useEffect(() => {
    window.onbeforeunload = (event: BeforeUnloadEvent) => {
      return "Are you sure to reload page?";
    };
  }, []);

  const onClickDoneButton = () => {
    if (!userCanComplete) {
      return;
    }
    dispatch(completeUser(userData))
      .then(unwrapResult)
      .then(() => history.push("/profile"))
      .catch((err: Error) => {
        alert(err.message);
      });
  };

  const onClickEditName = () => {
    setModalProps({
      type: "name",
      currentValue: userData?.displayName,
      onEditCompleted: (text: string) => {
        setUserData({ ...userData, displayName: text });
        return Promise.resolve();
      },
      maxLenght: undefined,
    });
  };

  const onClickEditUserName = () => {
    setModalProps({
      type: "userName",
      currentValue: userData?.username,
      onEditCompleted: (text: string) => {
        const isValid = userNameValidator(text);
        if (isValid) {
          return Promise.reject(
            new Error(
              "Username should contain only letters, numbers, periods, and underscores."
            )
          );
        }
        setUserData({ ...userData, username: text });
        return Promise.resolve();
      },
      maxLenght: 30,
    });
  };

  const onClickEditBio = () => {
    setModalProps({
      type: "bio",
      currentValue: userData?.bio,
      onEditCompleted: (text: string) => {
        setUserData({ ...userData, bio: text });
        return Promise.resolve();
      },
      maxLenght: 150,
    });
  };

  const userImage = (): string => {
    if (croppedImage !== null) {
      const link = URL.createObjectURL(croppedImage);
      return link;
    }
    if (userData !== undefined && userData.photoUrl !== null) {
      return userData.photoUrl;
    }
    return "/new-assets/images/no-user-image.svg";
  };

  if (pickedImage !== undefined) {
    return (
      <ImageCropper
        image={pickedImage}
        onCancel={() => setPickedImage(undefined)}
        onSave={(blob) => {
          setPickedImage(undefined);
          setCropperImage(blob);
        }}
        cropShape="round"
      />
    );
  }

  if (modalProps !== null) {
    return (
      <EditModal onClose={() => setModalProps(null)} inputProps={modalProps} />
    );
  }

  return (
    <div className="complete-profile-container">
      <div className="header margin-header small-padding">
        <div></div>
        <span className="header-title">Complete Profile</span>
        <button
          className="done Button"
          onClick={onClickDoneButton}
          hidden={!userCanComplete}
        >
          Done
        </button>
      </div>
      <EditProfileForm
        onPickedImage={setPickedImage}
        onClickEditBio={onClickEditBio}
        onClickEditName={onClickEditName}
        onClickEditUserName={onClickEditUserName}
        data={{
          userImage: userImage(),
          displayName: userData.displayName ?? undefined,
          userName: userData.username ?? undefined,
          bio: userData.bio ?? undefined,
          email: userData.email ?? undefined,
        }}
      />
    </div>
  );
};
