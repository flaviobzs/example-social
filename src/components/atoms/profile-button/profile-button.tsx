import React from "react";
import "./profile-button.scss";

interface Props {
  onPress: (() => void) | undefined;
  title: string;
  value: string | number;
  className?: string;
  isValueBlue?: boolean;
  isDesktop?: boolean;
}

export const ProfileButton = ({
  onPress,
  value,
  title,
  className,
  isValueBlue,
  isDesktop,
}: Props) => {
  return (
    <button onClick={onPress} className={className} value={value} title={title}>
      {isDesktop ? (
        <p>
          <strong className={isValueBlue ? "value blue" : "value"}>
            {value}
          </strong>{" "}
          <strong className="title">{title}</strong>
        </p>
      ) : (
        <p>
          <p className={isValueBlue ? "value blue" : "value"}>{value}</p>
          <p className="title">{title}</p>
        </p>
      )}
    </button>
  );
};
