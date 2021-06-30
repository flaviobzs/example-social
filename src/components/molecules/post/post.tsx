import React from "react";
import "./post.scss";
import { useHistory } from "react-router";
import { ImageComponent } from "../../atoms/image";
import { ButtonComponent } from "../../atoms/button";
import { Tag } from "../../atoms/tag";
import { Brand } from "../../atoms/brand";
import { FavouriteItem } from "../../../models/favourite";

interface Props {
  userPhotoUrl: string | null;
  favouriteItem: FavouriteItem;
}

export const Post = ({ userPhotoUrl, favouriteItem }: Props) => {
  const history = useHistory();

  return (
    <div className="post-container">
      {/* <div className='post-header'>
                <ImageComponent className='user-small-image'
                                    src={userPhotoUrl === null ? 
                                                    '/new-assets/images/profile-no-image.svg' : 
                                                    userPhotoUrl}/>
                <div className='post-author-name'>Tor</div>
                <ImageComponent className='star-image' src='/new-assets/images/star-favorite.svg' />
            </div> */}
      <div className="post-picture">
        <ImageComponent className="post-image" src={favouriteItem.imageURL} />
        <Brand
          brandTitle={`${favouriteItem.brand.name} ${favouriteItem.productName}`}
          brandImg={favouriteItem.brand.avatar ?? ""}
          className="brand-logo"
        />
      </div>
      <div className="post-info">
        <div className="post-tags-and-values">
          <ButtonComponent
            className="post-values"
            onPress={() => {
              history.push("/likes-wishlists-shares");
            }}
          >
            <ImageComponent
              className="small-image"
              src="/new-assets/images/like.svg"
            />
            <ImageComponent
              className="small-image"
              src="/new-assets/images/wishlist-active.svg"
            />
            <ImageComponent
              className="small-image"
              src="/new-assets/images/share-active.svg"
            />
            <strong>{favouriteItem.numberOfLikes}</strong>
          </ButtonComponent>
          <div className="tags-scroll">
            {favouriteItem.tags.map((el) => (
              <Tag text={el} key={el} />
            ))}
          </div>
        </div>
        <div className="post-description">{favouriteItem.description}</div>
        <div className="post-buttons">
          <ButtonComponent className="post-button" onPress={() => {}}>
            <ImageComponent
              className="post-button-image"
              src="/new-assets/images/like.svg"
            />{" "}
            Like
          </ButtonComponent>
          <ButtonComponent className="post-button" onPress={() => {}}>
            <ImageComponent
              className="wishlist-button-image"
              src="/new-assets/images/wishlist.svg"
            />{" "}
            Wishlist
          </ButtonComponent>
          <ButtonComponent className="post-button" onPress={() => {}}>
            <ImageComponent
              className="post-button-image"
              src="/new-assets/images/share.svg"
            />{" "}
            Share
          </ButtonComponent>
        </div>
      </div>
      <div className="post-comments">
        <ButtonComponent className="n-of-posts" onPress={() => {}}>
          <p>{`${favouriteItem.numberOfComments} comments`}</p>
        </ButtonComponent>
        <p className="main-comment">
          <strong>{favouriteItem.lastCommentAuthor}</strong>
          {favouriteItem.lastComment}
        </p>
        <ImageComponent
          className="user-small-image"
          src={
            userPhotoUrl === null
              ? "/new-assets/images/profile-no-image.svg"
              : userPhotoUrl
          }
        />
        <span
          contentEditable="true"
          role="textbox"
          className="comment-input"
          onChange={() => {}}
        ></span>
      </div>
    </div>
  );
};
