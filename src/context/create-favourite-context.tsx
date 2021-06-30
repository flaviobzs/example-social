import React, { FC, ReactNode, useState } from "react";
import { Product } from "../models/product";

type ChoosenImage = string | Blob | undefined;

interface ContextProps {
  product: Product | null;
  setProduct: (product: Product | null) => void;
  choosenImage: ChoosenImage;
  setChoosenImage: (image: ChoosenImage) => void;
  clear: () => void;
}

const AddFavouriteContext = React.createContext<ContextProps>({
  product: null,
  setProduct: (product: Product | null) => undefined,
  choosenImage: undefined,
  setChoosenImage: (image: ChoosenImage) => undefined,
  clear: () => undefined,
});

interface Props {
  children?: ReactNode;
}

export const AddFavouriteContextProvider: FC<Props> = ({ children }: Props) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [choosenImage, setChoosenImage] = useState<ChoosenImage>(undefined);

  const clear = () => {
    setProduct(null);
    setChoosenImage(undefined);
  };

  const value: ContextProps = {
    product,
    setProduct,
    choosenImage,
    setChoosenImage,
    clear,
  };
  return (
    <AddFavouriteContext.Provider value={value}>
      {children}
    </AddFavouriteContext.Provider>
  );
};

export const useAddFavouriteContext = (): ContextProps => {
  const context = React.useContext(AddFavouriteContext);

  if (context === undefined) {
    throw new Error(
      "useAddFavouriteContext must be used wuthin a AddFavouriteProvider"
    );
  }

  return context;
};
