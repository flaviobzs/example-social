import React from "react";

interface Props {
  children: React.ReactNode;
  onPress: (() => void) | undefined;
  className?: string;
}

export const ButtonComponent = ({ onPress, children, className }: Props) => {
  return (
    <button onClick={onPress} className={className}>
      {children}
    </button>
  );
};
