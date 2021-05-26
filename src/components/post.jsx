import React from "react";
import { ArrowUp, ArrowDown, Edit, Delete } from "components/svg";
import { auth } from "utils";
import Link from "next/link";

export const Post = ({ post, signedIn }) => {
  const handleDeletePost = () => {};
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
