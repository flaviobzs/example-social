import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const LabelComponent = ({ children, className = "" }: Props) => {
  return <label className={className}>{children}</label>;
};
