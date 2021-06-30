import React, { FC, ReactNode, useEffect, useState } from "react";

interface ContextProps {
  onMobile: boolean;
}

const defaultContextValues: ContextProps = {
  onMobile: false,
};

const MediaQueryContext =
  React.createContext<ContextProps>(defaultContextValues);

interface Props {
  children?: ReactNode;
}

export const MediaQueryContextProvider: FC<Props> = ({ children }: Props) => {
  const [onMobile, setOnMobile] = useState<boolean>(false);
  const mediaQueryChanged = (e: MediaQueryListEvent): void =>
    setOnMobile(e.matches);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 868px)");
    if (mql.addEventListener) {
      mql.addEventListener("change", mediaQueryChanged);
    } else {
      mql.addListener(mediaQueryChanged);
    }
    setOnMobile(mql.matches);

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", mediaQueryChanged);
      } else {
        mql.removeListener(mediaQueryChanged);
      }
    };
  }, []);

  const providerValue = {
    onMobile,
  };

  return (
    <MediaQueryContext.Provider value={providerValue}>
      {children}
    </MediaQueryContext.Provider>
  );
};

export const useMediaContext = (): boolean => {
  // return if on mobile
  const context = React.useContext(MediaQueryContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context.onMobile;
};
