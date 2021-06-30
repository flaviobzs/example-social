import React, { useCallback, useEffect, useState } from "react";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  placeholderImg?: string;
}

export const ImageComponent = ({
  placeholderImg,
  className = "",
  src,
  ...props
}: Props) => {
  const [imgSrc, setSrc] = useState(placeholderImg || src);

  const onLoad = useCallback(() => {
    setSrc(src);
  }, [src]);

  useEffect(() => {
    const img = new Image();
    img.src = src as string;
    img.addEventListener("loadd", onLoad);

    return () => img.removeEventListener("load", onLoad);
  }, [src, onLoad]);

  return <img className={className} {...props} src={imgSrc} alt="" />;
};
