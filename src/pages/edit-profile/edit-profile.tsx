import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { EditModal, InputProps } from "../../component/organism/edit-modal";
import { uploadFile } from "../../firebase/storage";
import { userConverter } from "../../models/user";
import { logOut, updateUserInfo } from "../../redux/auth-reducer";
import { getUser } from "../../redux/selectors";
import { ButtonComponent } from "../../component/atoms/button";
import { useAppDispatch } from "../../redux/store";
import { ImageCropper } from "../image-cropper";
import { EditProfileForm } from "../../component/organism/edit-profile-form";
import { userNameIsUnique } from "../../firebase/firestore/user";
import "./edit-profile.scss";
import "../../../scss/header.scss";
import { userNameValidator } from "../../utils/validator";
import { ImageComponent } from "../../component/atoms/image";

interface Props {}

export const EditProfile = () => {
  const [modalProps, setModalProps] = useState<InputProps | null>(null);
  const [pickedImage, setPickedImage] = useState<string | undefined>(undefined);
  const [croppedImage, setCroppedImage] = useState<Blob | null>(null);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const storedUser = useSelector(getUser)!;
  const [userData, setUserData] = useState(() =>
    userConverter.toUserInfo(storedUser)
  );

  const onClickEditName = () => {
    setModalProps({
      type: "name",
      currentValue: userData.displayName,
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
      currentValue: userData.username,
      onEditCompleted: async (text: string) => {
        const isValid = userNameValidator(text);
        if (isValid) {
          return Promise.reject(
            new Error(
              "Username should contain only letters, numbers, periods, and underscores."
            )
          );
        }
        const isUnique = await userNameIsUnique(text, storedUser.uid);
        if (!isUnique) {
          return Promise.reject(
            new Error("This username isn't available. Please try another")
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
      currentValue: userData.bio,
      onEditCompleted: (text: string) => {
        setUserData({ ...userData, bio: text });
        return Promise.resolve();
      },
      maxLenght: 150,
    });
  };

  const onClickSave = async () => {
    try {
      let userDataToUpdate = userData;
      if (croppedImage !== null) {
        const imageURl = await uploadFile(croppedImage);
        userDataToUpdate.photoUrl = imageURl;
      }
      await dispatch(updateUserInfo(userDataToUpdate));
      history.goBack();
    } catch (e) {
      alert("Failed to update user info");
    }
  };

  const onClickLogout = () => {
    dispatch(logOut());
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

  if (modalProps !== null) {
    return (
      <EditModal onClose={() => setModalProps(null)} inputProps={modalProps} />
    );
  }

  if (pickedImage !== undefined) {
    return (
      <ImageCropper
        image={pickedImage}
        onCancel={() => setPickedImage(undefined)}
        onSave={(blob) => {
          setPickedImage(undefined);
          setCroppedImage(blob);
        }}
        cropShape={"round"}
      />
    );
  }

  if (modalProps !== null) {
    return (
      <EditModal onClose={() => setModalProps(null)} inputProps={modalProps} />
    );
  }

  return (
    <div className="edit-profile-container">
      <div className="header margin-header">
        <ButtonComponent className="Button" onPress={history.goBack}>
          <ImageComponent src="/new-assets/images/back.svg" />
        </ButtonComponent>
        <span className="header-title">Edit Profile</span>
        <ButtonComponent className="save Button" onPress={onClickSave}>
          Save
        </ButtonComponent>
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
      <div className="bottom-buttons edit-profile-body">
        <ButtonComponent className="feedback Button" onPress={() => {}}>
          Send us feedback
        </ButtonComponent>
        <ButtonComponent className="logout Button" onPress={onClickLogout}>
          Log Out
        </ButtonComponent>
      </div>
    </div>
  );
};
