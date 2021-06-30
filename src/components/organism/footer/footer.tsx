import React from "react";
import { ButtonComponent } from "../../atoms/button";
import { ImageComponent } from "../../atoms/image";
import { UserImage } from "../../atoms/user-icon";
import { useHistory } from "react-router";
import "./footer.scss";

interface Props {
  className?: string;
  photoUrl: string | null;
}

export const Footer = ({ className, photoUrl }: Props) => {
  const history = useHistory();
  const press = () => {};

  return (
    <div className={"profile-nav " + className}>
      <ButtonComponent className="nav-button" onPress={press}>
        <ImageComponent
          className="home-icon"
          src={"/new-assets/images/home-footer.svg"}
        />
        <span className="nav-button-text">Home</span>
      </ButtonComponent>
      <ButtonComponent className="nav-button" onPress={press}>
        <ImageComponent
          className="search-icon"
          src={"/new-assets/images/search-footer-icon.svg"}
        />
        <span className="nav-button-text">smth</span>
      </ButtonComponent>
      <ButtonComponent
        className="nav-button"
        onPress={() => {
          history.push("/add-to-favorite");
        }}
      >
        <ImageComponent
          className="star-icon"
          src={"/new-assets/images/star-footer.svg"}
        />
        <span className="nav-button-text">smth</span>
      </ButtonComponent>
      <ButtonComponent className="nav-button" onPress={press}>
        <ImageComponent
          className="notification-icon"
          src={"/new-assets/images/bell-footer.svg"}
        />
        <span className="nav-button-text">Notifications</span>
      </ButtonComponent>
      <ButtonComponent
        className="nav-button me-button"
        onPress={() => {
          history.push("/profile");
        }}
      >
        <UserImage photoUrl={photoUrl} />
        <span className="nav-button-text active">Me</span>
      </ButtonComponent>
    </div>
  );
};
