import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { WishlistItem } from "../../models/wishlist";
import { ImageCropper } from "../image-cropper";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/selectors";
import { updateUserImage } from "../../redux/auth-reducer";
import { getUsersFavourite } from "../../firebase/firestore/favourite";
import { FavouriteItem } from "../../models/favourite";
import { ProfileMobile } from "../../component/organism/profile-component/profile-component";

interface Props {}

export type MenuSwitchMode = "favourite" | "wishlist";

export const Profile = () => {
  const dispatch = useAppDispatch();
  const storedUser = useSelector(getUser)!;
  const history = useHistory();
  const [pickedImage, setPickedImage] = useState<string | undefined>(undefined);

  const [switchMode, setSwitchMode] = useState<MenuSwitchMode>("favourite");

  const [favourites, setFavourites] = useState<FavouriteItem[]>([]);
  const [wishList] = useState<WishlistItem[]>([]);

  const onPressEditUser = () => {
    history.push("/edit-profile");
  };

  useEffect(() => {
    console.log(storedUser.uid);
    getUsersFavourite(storedUser.uid).then((val) => setFavourites(val));
  }, [storedUser.uid]);

  //TODO: Refactoring
  const onPickedImage = async (e: any) => {
    const imageData = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(imageData);
    reader.addEventListener("load", () => {
      setPickedImage(reader.result as string);
    });
  };
  const press = () => {};

  if (pickedImage !== undefined) {
    return (
      <ImageCropper
        image={pickedImage}
        onCancel={() => setPickedImage(undefined)}
        onSave={(blob) => {
          setPickedImage(undefined);
          dispatch(updateUserImage({ file: blob!, uid: storedUser.uid }));
        }}
        cropShape={"round"}
      />
    );
  }

  const userImage =
    storedUser.photoUrl !== undefined
      ? storedUser.photoUrl
      : "/new-assets/images/no-user-image.svg";
  return (
    <ProfileMobile
      userName={storedUser.username}
      userImage={userImage}
      clout={storedUser.clout ?? 0}
      numberOfFollowers={storedUser.follower ?? 0}
      numberOfFollowings={storedUser.following ?? 0}
      bio={storedUser.bio}
      favourites={favourites}
      menuSwitchMode={switchMode}
      wishList={wishList}
      onPressShareButton={press}
      onPickedImage={onPickedImage}
      onPressClout={press}
      onPressEditUser={onPressEditUser}
      onPressFollower={press}
      onPressFollowing={press}
      setSwitchMode={setSwitchMode}
    />
  );
};
