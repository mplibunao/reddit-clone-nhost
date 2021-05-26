import React from "react";
import { ArrowUp, ArrowDown, Edit, Delete } from "components/svg";
import { auth } from "utils";
import Link from "next/link";
import { gql, useMutation } from "@apollo/client";

const DELETE_POST = gql`
  mutation deletePost($post_id: uuid!) {
    delete_posts_by_pk(id: $post_id) {
      id
    }
  }
`;

export const Post = ({ post, signedIn }) => {
  console.log("post", post.user_id); // eslint-disable-line no-console
  console.log(auth.getClaim("x-hasura-user-id")); // eslint-disable-line no-console
  const [deletePost] = useMutation(DELETE_POST);
  const handleDeletePost = async () => {
    try {
      await deletePost({ variables: { post_id: post.id } });
    } catch (error) {
      console.log("error", error); // eslint-disable-line no-console
    }
  };

  return (
    <div className="flex p-6 shadow-md">
      <div className="flex flex-col items-center">
        <div>
          <div className="cursor-pointer hover:bg-green-700 rounded-full hover:text-white p-2  transition-all ease-in-out duration-150">
            <ArrowUp className="w-8 h-8" />
          </div>
        </div>
        <div className="py-4"># of votes</div>
        <div>
          <div className="p-2 rounded-full cursor-pointer hover:bg-red-700 hover:text-white transition-all ease-in-out duration-150">
            <ArrowDown className="w-8 h-8" />
          </div>
        </div>
      </div>
      <div className="pl-6">
        <div className="text-3xl font-semibold">{post.title}</div>
        <div className="py-4 text-gray-700">{post.description}</div>
        {signedIn && post.user_id === auth.getClaim("x-hasura-user-id") && (
          <div className="flex items-center">
            <div>
              <Link href={`/post/${post.id}/edit`}>
                <a>
                  <Edit className="w-6 h-6" />
                </a>
              </Link>
            </div>
            <div className="px-4">
              <div className="cursor-pointer" onClick={handleDeletePost}>
                <Delete className="w-6 h-6" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
