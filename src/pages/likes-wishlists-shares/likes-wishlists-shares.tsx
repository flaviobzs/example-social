import React, { useState } from "react";
import { ButtonComponent } from "../../component/atoms/button";
import { ImageComponent } from "../../component/atoms/image";
// import { UserInfo } from '../../component/molecules/user'
import "./likes-wishlists-shares.scss";

export const LikesWishlistsShares = () => {
  const [menuSwitch, setMenuSwitch] = useState(1);

  return (
    <div className="likes-wishlists-shares">
      <ButtonComponent className="back-button" onPress={() => {}}>
        <ImageComponent src="/new-assets/images/back.svg" />
      </ButtonComponent>
      <div className="header-buttons">
        <ButtonComponent
          className={
            menuSwitch === 1 ? "header-button active" : "header-button"
          }
          onPress={() => {
            setMenuSwitch(1);
          }}
        >
          <strong className="NAN">All </strong>
          <strong>69</strong>
        </ButtonComponent>
        <ButtonComponent
          className={
            menuSwitch === 2 ? "header-button active" : "header-button"
          }
          onPress={() => {
            setMenuSwitch(2);
          }}
        >
          <ImageComponent src="/new-assets/images/like.svg" />{" "}
          <strong>30</strong>
        </ButtonComponent>
        <ButtonComponent
          className={
            menuSwitch === 3 ? "header-button active" : "header-button"
          }
          onPress={() => {
            setMenuSwitch(3);
          }}
        >
          <ImageComponent src="/new-assets/images/wishlist-active.svg" />{" "}
          <strong>5</strong>
        </ButtonComponent>
        <ButtonComponent
          className={
            menuSwitch === 4 ? "header-button active" : "header-button"
          }
          onPress={() => {
            setMenuSwitch(4);
          }}
        >
          <ImageComponent src="/new-assets/images/share-active.svg" />{" "}
          <strong>34</strong>
        </ButtonComponent>
      </div>
      <div className="users-container">{/* <UserInfo user={}/> */}</div>
    </div>
  );
};
