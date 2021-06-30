import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { ButtonComponent } from "../../component/atoms/button";
import { ImageComponent } from "../../component/atoms/image";
import { LabelComponent } from "../../component/atoms/label";
import { SignUpButton } from "../../component/molecules/sign-up-button";
import { useMediaContext } from "../../context/media-query-context";
import { User } from "../../models/user";
import { googleLogIn } from "../../redux/auth-reducer";
import { useAppDispatch } from "../../redux/store";
import { CompleteProfile } from "../complete-profile";
import "./sign-up-screen.scss";

interface Props {}

export const SignUpScreen = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const isMobile = useMediaContext();
  const [showCompleteProfile, setShowCompleteProfile] = useState(false);

  const checkUserLoginState = (isLoggedIn: boolean, user: User | null) => {
    if (user === null) {
      return;
    }
    if (!isLoggedIn) {
      setShowCompleteProfile(true);
    } else {
      history.push("/profile");
    }
  };

  const onPressFacebook = () => {
    //TODO: add facebook login
  };

  const onPressGoogle = () => {
    dispatch(googleLogIn())
      .then(unwrapResult)
      .then((state) => checkUserLoginState(state.loggedIn, state.user));
  };

  const onPressEmailOrPhone = () => {
    //TODO: add email or phone login
  };

  const onPressLogIn = () => {
    //TODO: add login
  };

  if (showCompleteProfile) {
    return <CompleteProfile />;
  }

  if (isMobile) {
    return (
      <div className="background">
        <div className="content-container">
          <LabelComponent className="title">
            Sign up for Social Ocean
          </LabelComponent>
          <div className="button-container">
            <SignUpButton
              onClick={onPressEmailOrPhone}
              title="Use phone or email"
              imgSrc="/new-assets/images/phone-or-email.svg"
            />
            <SignUpButton
              onClick={onPressFacebook}
              title="Continue with Facebook"
              imgSrc="/new-assets/images/facebook.svg"
            />
            <SignUpButton
              onClick={onPressGoogle}
              title="Continue with Google"
              imgSrc="/new-assets/images/google.svg"
            />
          </div>
          <div className="privacy-text-wrapper">
            <LabelComponent className="privacy-text">
              By continuing, you accept social ocean's
              <span className="strong"> terms of service</span>
            </LabelComponent>
            <LabelComponent className="privacy-text">
              and
              <span className="strong"> privacy policy.</span>
            </LabelComponent>
          </div>
        </div>
        <div className="footer">
          <div className="footer-container">
            <LabelComponent className="footer-label">
              Already have an account?
            </LabelComponent>
            <ButtonComponent
              onPress={onPressLogIn}
              className="transparent-button login-button"
            >
              Log in
            </ButtonComponent>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="background">
        <div className="content-container">
          <ImageComponent
            src={"/new-assets/images/main-logo.svg"}
            className="main-logo"
          />
          <LabelComponent className="title">
            Sign up for Social Ocean
          </LabelComponent>
          <div className="button-container">
            <SignUpButton
              onClick={onPressEmailOrPhone}
              title="Use phone or email"
              imgSrc="/new-assets/images/phone-or-email.svg"
            />
            <SignUpButton
              onClick={onPressFacebook}
              title="Continue with Facebook"
              imgSrc="/new-assets/images/facebook.svg"
            />
            <SignUpButton
              onClick={onPressGoogle}
              title="Continue with Google"
              imgSrc="/new-assets/images/google.svg"
            />
          </div>
          <div className="footer">
            <div className="footer-container">
              <LabelComponent className="footer-label">
                Already have an account?
              </LabelComponent>
              <ButtonComponent
                onPress={onPressLogIn}
                className="transparent-button login-button"
              >
                Log in
              </ButtonComponent>
            </div>
          </div>
          <div className="privacy-text-wrapper">
            <LabelComponent className="privacy-text">
              By continuing, you accept social ocean's
              <span className="strong"> terms of service</span>
            </LabelComponent>
            <LabelComponent className="privacy-text">
              and
              <span className="strong"> privacy policy.</span>
            </LabelComponent>
          </div>
        </div>
      </div>
    );
  }
};
