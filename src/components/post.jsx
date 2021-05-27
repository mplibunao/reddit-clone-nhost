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

const UPSERT_POST_VOTE = gql`
  mutation upsertPostVote($post_vote: post_votes_insert_input!) {
    insert_post_votes_one(
      object: $post_vote
      on_conflict: {
        constraint: post_upvotes_post_id_user_id_key
        update_columns: vote_type
      }
    ) {
      id
    }
  }
`;

const DELETE_POST_VOTE = gql`
  mutation deletePostVote($post_vote_id: uuid!) {
    delete_post_votes_by_pk(id: $post_vote_id) {
      id
    }
  }
`;

export const Post = ({ post, signedIn }) => {
  const [deletePost] = useMutation(DELETE_POST);
  const [upsertPostVote] = useMutation(UPSERT_POST_VOTE);
  const [deletePostVote] = useMutation(DELETE_POST_VOTE);

  const vote =
    post?.post_votes?.length === 1 ? post.post_votes[0].vote_type : 0;

  const handleDeletePost = async () => {
    try {
      await deletePost({ variables: { post_id: post.id } });
    } catch (error) {
      console.log("error", error); // eslint-disable-line no-console
    }
  };

  const onUpvoteClick = async () => {
    try {
      if (vote === 1) {
        await deletePostVote({
          variables: { post_vote_id: post.post_votes[0].id },
        });
      } else {
        await upsertPostVote({
          variables: { post_vote: { vote_type: 1, post_id: post.id } },
        });
      }
    } catch (err) {
      alert("You must login to upvote");
      console.log("err", err); // eslint-disable-line no-console
    }
  };

  const onDownVoteClick = async () => {
    try {
      if (vote === -1) {
        await deletePostVote({
          variables: { post_vote_id: post.post_votes[0].id },
        });
      } else {
        await upsertPostVote({
          variables: { post_vote: { vote_type: -1, post_id: post.id } },
        });
      }
    } catch (err) {
      alert("You must login to downvote");
      console.log("err", err); // eslint-disable-line no-console
    }
  };

  return (
    <div className="flex p-6 shadow-md">
      <div className="flex flex-col items-center">
        <div>
          <div
            className={`cursor-pointer hover:bg-green-700 rounded-full hover:text-white p-2  transition-all ease-in-out duration-150 ${
              vote === 1 && "bg-green-200"
            }`}
            onClick={onUpvoteClick}
          >
            <ArrowUp className="w-8 h-8" />
          </div>
        </div>
        <div className="py-4">
          {post.post_votes_aggregate.aggregate.sum.vote_type || 0}
        </div>
        <div>
          <div
            className={`p-2 rounded-full cursor-pointer hover:bg-red-700 hover:text-white transition-all ease-in-out duration-150 ${
              vote === -1 && "bg-red-200"
            }`}
            onClick={onDownVoteClick}
          >
            <ArrowDown className="w-8 h-8" />
          </div>
        </div>
      </div>
      <div className="pl-6">
        <div className="text-3xl font-semibold">{post.title}</div>
        <div className="py-2 text-sm">{post.user.display_name}</div>
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
