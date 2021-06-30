import React from "react";
import { FavouriteItem } from "../../../models/favourite";
import { Post } from "../../molecules/post";
import "./posts.scss";

interface Props {
  userPhotoUrl: string | null;
  favouriteItem: FavouriteItem;
}

export const Posts = ({ userPhotoUrl, favouriteItem }: Props) => {
  return (
    <div className="posts-container">
      <Post userPhotoUrl={userPhotoUrl} favouriteItem={favouriteItem} />
    </div>
  );
};
