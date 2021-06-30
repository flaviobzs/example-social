import React from "react";
import "./auth-background.scss";

interface Props {
  children: React.ReactNode;
}

export const AuthBackground = ({ children }: Props) => {
  return <div className="background">{children}</div>;
};
