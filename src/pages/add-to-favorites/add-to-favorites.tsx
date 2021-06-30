import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ButtonComponent } from "../../component/atoms/button";
import { ImageComponent } from "../../component/atoms/image";
import { useAddFavouriteContext } from "../../context/create-favourite-context";
import {
  getSuggestedProducts,
  getTrendingProducts,
} from "../../firebase/firestore/brand";
import { Brand } from "../../models/brand";
import { Product } from "../../models/product";
import "./add-to-favorite.scss";
import "../../../scss/header.scss";

interface Props {}

export const AddToFavorite = () => {
  const history = useHistory();
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [trending, setTrending] = useState<Product[]>([]);
  const { setProduct } = useAddFavouriteContext();

  const [brands] = useState<Brand[]>([]);
  const [showBrandProducts, setShowBrandProducts] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalInput, setModalInput] = useState("");

  useEffect(() => {
    Promise.all([getSuggestedProducts(), getTrendingProducts()]).then(
      (result) => {
        setSuggested(result[0]);
        setTrending(result[1]);
      }
    );
  }, []);

  const renderProductItem = (product: Product) => {
    return (
      <ButtonComponent
        onPress={() => {
          setProduct(product);
          history.push("/add-product");
        }}
        className="product"
        key={product.id + product.brand.id}
      >
        <ImageComponent src={product.avatar ?? ""} />
        <div className="brand">
          <ImageComponent
            className="border no-border"
            src={product.brand.avatar ?? ""}
          />
          <strong className="brand-title brand-product">
            {product.brand.name} {product.name}
          </strong>
        </div>
      </ButtonComponent>
    );
  };

  const searchResults = brands.map((el) => (
    <div>
      <ButtonComponent
        key={el.id}
        onPress={() => {
          showBrandProducts === el.id
            ? setShowBrandProducts("")
            : setShowBrandProducts(el.id);
        }}
        className="brands-conteiner"
      >
        <ImageComponent
          className="brands-logo"
          src={el.avatar === undefined ? "" : el.avatar}
        />
        {el.name}
      </ButtonComponent>
      {showBrandProducts === el.id ? (
        <ButtonComponent
          onPress={() => {
            history.push("/add-product");
          }}
        >
          Some products
        </ButtonComponent>
      ) : (
        <div></div>
      )}
    </div>
  ));

  return (
    <div>
      {showModal ? (
        <div className="search-modal-overlay">
          <div className="search-modal">
            <ButtonComponent
              onPress={() => {
                setShowModal(false);
              }}
              className="back-button"
            >
              <ImageComponent src={"/new-assets/images/back.svg"} />
            </ButtonComponent>
            <div className="search-header">Search</div>
            <div className="search">
              <ImageComponent
                className="search-icon"
                src="/new-assets/images/search-icon.svg"
              />
              <input
                id="input"
                autoFocus
                type="text"
                placeholder="Search for a brand or product"
                onChange={() => {
                  setModalInput(
                    (document.getElementById("input") as HTMLInputElement).value
                  );
                }}
              />
              <ButtonComponent
                onPress={() => {
                  (document.getElementById("input") as HTMLInputElement).value =
                    "";
                }}
                className="clear-button"
              >
                {modalInput.length > 0 ? (
                  <ImageComponent src={"/new-assets/images/close.svg"} />
                ) : (
                  <div></div>
                )}
              </ButtonComponent>
            </div>
            {searchResults}
          </div>
        </div>
      ) : (
        <div></div>
      )}

      <div className="header single-header bordered-header">
        <div className="header-title">
          Add to{" "}
          <ImageComponent
            className="star-image"
            src="/new-assets/images/star-favorite.svg"
          />{" "}
          Favorites
        </div>
      </div>
      <ButtonComponent
        onPress={() => {
          history.push("/profile");
        }}
        className="close-button"
      >
        <ImageComponent src={"/new-assets/images/close.svg"} />
      </ButtonComponent>
      <div className="add-to-favorites-container">
        <div className="search">
          <ImageComponent
            className="search-icon"
            src="/new-assets/images/search-icon.svg"
          />
          <input
            type="text"
            placeholder="Search for a brand or product"
            onClick={() => {}}
          />
        </div>
        <div className="title-with-images">
          <p className="block-title">Suggested</p>
          <div className="products-grid">
            {suggested.map((e) => renderProductItem(e))}
          </div>
        </div>
        <div className="title-with-images">
          <p className="block-title trending">Trending</p>
          <div className="products-grid">
            {trending.map((e) => renderProductItem(e))}
          </div>
        </div>
      </div>
    </div>
  );
};
