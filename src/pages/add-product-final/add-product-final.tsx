import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ButtonComponent } from "../../component/atoms/button";
import { ImageComponent } from "../../component/atoms/image";
import { useAddFavouriteContext } from "../../context/create-favourite-context";
import { addProductToFavourite } from "../../firebase/firestore/favourite";
import { getAllTags } from "../../firebase/firestore/tags";
import { uploadFile } from "../../firebase/storage";
import { Product } from "../../models/product";
import { Tag } from "../../models/tag";
import { getUser } from "../../redux/selectors";
import "./add-product-final.scss";
import "../../../scss/header.scss";

interface Props {
  chosenImage: string | Blob;
  product: Product;
}

export const AddProductFinal = () => {
  const history = useHistory();
  const { choosenImage, product, clear } = useAddFavouriteContext();

  const [showModal, setShowModal] = useState(false);
  const [tagInputOnFocus, focusTagInput] = useState(false);
  const [suggestTags, setSuggestTags] = useState<Tag[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState("");

  const [sharing, setSharing] = useState(false);
  const userUid = useSelector(getUser)!.uid;

  useEffect(() => {
    getAllTags().then((suggestTags) => setSuggestTags(suggestTags));
  }, []);

  const onPressShareButton = async () => {
    if (sharing) {
      return;
    }
    let imageURL: string;
    if (choosenImage instanceof Blob) {
      imageURL = await uploadFile(choosenImage);
    } else {
      imageURL = choosenImage as string;
    }
    addProductToFavourite({
      userId: userUid,
      product: product!,
      imageURL: imageURL,
      description: description ?? "",
      tags: tags,
    })
      .then(() => setSharing(false))
      .then(() => {
        history.replace("/profile");
        clear();
      });
  };

  const removeTags = (indexToRemove: number, event: any) => {
    if (event.target.value.length === 0)
      setTags([
        ...tags.filter((_el: any, index: number) => index !== indexToRemove),
      ]);
  };
  const addTags = (event: any) => {
    if (
      event.target.value.replace(" ", "").length > 0 &&
      !tags.includes(event.target.value)
    ) {
      setTags([...tags, event.target.value.replace(" ", "")]);
      event.target.value = "";
    } else if (
      event.target.value.replace(" ", "").length === 0 &&
      event.target.value.length > 0
    )
      event.target.value = "";
  };
  const renderTagItems = (tag: Tag) => {
    return (
      <ButtonComponent
        className={tags.includes(tag.name) ? "used-tag" : "suggested-tag"}
        onPress={() => {
          if (!tags.includes(tag.name))
            setTags([...tags, tag.name.replace(" ", "")]);
          document.getElementById("tag-input-id")?.focus();
        }}
        key={tag.id}
      >
        #{tag.name.toLowerCase()}
      </ButtonComponent>
    );
  };

  const imageFuntion = (): string => {
    return choosenImage instanceof Blob
      ? URL.createObjectURL(choosenImage)
      : choosenImage!;
  };
  const image = imageFuntion();

  return (
    <div className="add-product-final-step">
      {showModal ? (
        <div className="input-modal-overlay">
          <div className="input-modal">
            <textarea
              id="description-modal-input-id"
              onBlur={() => {
                setShowModal(false);
                (
                  document.getElementById(
                    "description-input-id"
                  ) as HTMLInputElement
                ).value = (
                  document.getElementById(
                    "description-modal-input-id"
                  ) as HTMLInputElement
                ).value;
              }}
              onFocus={() => {
                (
                  document.getElementById(
                    "description-modal-input-id"
                  ) as HTMLInputElement
                ).value = (
                  document.getElementById(
                    "description-input-id"
                  ) as HTMLInputElement
                ).value;
              }}
              autoFocus
              className="description-input"
              placeholder="Share more about the #benefits and your experience with this product"
              onChange={(e) => setDescription(e.target.value)}
              defaultValue={description}
            />
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div className="header bordered-header">
        <ButtonComponent className="back Button" onPress={history.goBack}>
          <ImageComponent src="/new-assets/images/back.svg" />
        </ButtonComponent>
        <div className="header-title">New Favorite</div>
        <ButtonComponent
          className="next Button"
          onPress={() => {
            setShowModal(false);
            focusTagInput(false);
            if (
              (
                document.getElementById("tag-input-id") as HTMLInputElement
              ).value.replace(" ", "").length > 0
            ) {
              setTags([
                ...tags,
                (
                  document.getElementById("tag-input-id") as HTMLInputElement
                ).value.replace(" ", ""),
              ]);
              (
                document.getElementById("tag-input-id") as HTMLInputElement
              ).value = "";
            }
          }}
        >
          {showModal || tagInputOnFocus ? "Done" : ""}
        </ButtonComponent>
      </div>
      <div className="add-product-final-step-container">
        <ImageComponent className="chosen-image-final" src={image} />
        <div className="tags-input">
          <ul
            id="tags"
            onClick={() => {
              document.getElementById("tag-input-id")?.focus();
            }}
          >
            {tags.map((tag, index) => (
              <li key={index} className="tag">
                <strong>#</strong>
                <span className="tag-title">{tag.toLowerCase()}</span>
              </li>
            ))}
          </ul>
          <div>
            {tagInputOnFocus ? (
              <div className="input-before">#</div>
            ) : (
              <div></div>
            )}
            <textarea
              onChange={() => {
                (
                  document.getElementById("tag-input-id") as HTMLInputElement
                ).value = (
                  document.getElementById("tag-input-id") as HTMLInputElement
                ).value.toLowerCase();
                if (
                  (document.getElementById("tag-input-id") as HTMLInputElement)
                    .value[
                    (
                      document.getElementById(
                        "tag-input-id"
                      ) as HTMLInputElement
                    ).value.length - 1
                  ] === " " &&
                  (
                    document.getElementById("tag-input-id") as HTMLInputElement
                  ).value.replace(" ", "").length > 0
                ) {
                  setTags([
                    ...tags,
                    (
                      document.getElementById(
                        "tag-input-id"
                      ) as HTMLInputElement
                    ).value.replace(" ", ""),
                  ]);
                  (
                    document.getElementById("tag-input-id") as HTMLInputElement
                  ).value = "";
                }
                (
                  document.getElementById("tag-input-id") as HTMLInputElement
                ).value = (
                  document.getElementById("tag-input-id") as HTMLInputElement
                ).value.replace(" ", "");
              }}
              onKeyUp={(event) =>
                event.key === "Enter" || event.key === " "
                  ? addTags(event)
                  : event.key === "Backspace"
                  ? removeTags(tags.length - 1, event)
                  : null
              }
              id="tag-input-id"
              placeholder={
                tags.length > 0
                  ? ""
                  : tagInputOnFocus
                  ? "Tag benefits or what this product helps you with"
                  : "Tap to tag #benefits..."
              }
              onFocus={() => {
                focusTagInput(true);
              }}
              onBlur={() => {
                if (
                  (
                    document.getElementById("tag-input-id") as HTMLInputElement
                  ).value.replace(" ", "").length > 0
                ) {
                  setTags([
                    ...tags,
                    (
                      document.getElementById(
                        "tag-input-id"
                      ) as HTMLInputElement
                    ).value.replace(" ", ""),
                  ]);
                  (
                    document.getElementById("tag-input-id") as HTMLInputElement
                  ).value = "";
                }
              }}
            />
          </div>
        </div>
        {tagInputOnFocus ? (
          <div className="suggested-tags-conteiner">
            <p className="top-header">Top #</p>
            {suggestTags.map((el) => renderTagItems(el))}
          </div>
        ) : (
          <textarea
            id="description-input-id"
            onClick={() => {
              setShowModal(true);
            }}
            className="description-input"
            placeholder="Tap to share more..."
            defaultValue={description}
          />
        )}
        <p className="automatically-share-label">Automatically share to:</p>
        {/* to do clickable button for share to other socials */}
        <ImageComponent src="/new-assets/temp-images/temp-share-img.svg" />
        <div className="buttons">
          <ButtonComponent className="drafts" onPress={() => {}}>
            Drafts
          </ButtonComponent>
          <ButtonComponent
            className={
              tags.length > 0 || description.length > 0
                ? "share colored"
                : "share"
            }
            onPress={
              tags.length > 0 || description.length > 0
                ? onPressShareButton
                : () => {}
            }
          >
            Share
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
};
