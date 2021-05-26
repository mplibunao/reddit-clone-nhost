import React from "react";
import { useRouter } from "next/router";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Layout, Main } from "components/layout";

const GET_POST = gql`
  query getPost($post_id: uuid!) {
    post: posts_by_pk(id: $post_id) {
      id
      title
      description
    }
  }
`;

const UPDATE_POST = gql`
  mutation udpdatePost($post_id: uuid!, $post: posts_set_input) {
    update_posts_by_pk(pk_columns: { id: $post_id }, _set: $post) {
      id
      title
      description
    }
  }
`;

export const Edit = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data, loading, error } = useQuery(GET_POST, {
    variables: { post_id: slug },
  });

  if (loading && !data) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  const { post } = data;

  return <EditPost post={post} />;
};

export const EditPost = ({ post: { id, title, description } }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: { title, description },
    mode: "onBlur",
  });

  const router = useRouter();

  const [updatePost] = useMutation(UPDATE_POST);

  const onSubmit = async (newPost) => {
    try {
      await updatePost({ variables: { post: newPost, post_id: id } });
      alert("post updated");
      router.push("/");
    } catch (err) {
      alert("post update failed");
      console.error(err);
    }
  };

  return (
    <Layout>
      <Main>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-2">
              <input
                type="text"
                placeholder="Title"
                className="px-4 py-1 my-2 border rounded w-full"
                name="title"
                {...register("title", { required: true })}
              />
            </div>

            <div className="py-2">
              <textarea
                type="text"
                className="w-full px-4 py-1 my-2 border rounded"
                placeholder="Description"
                {...register("description")}
              />
            </div>

            <div className="py-2">
              <button
                type="submit"
                className="px-4 py-2 text-sm text-white uppercase bg-indigo-700"
              >
                Edit post
              </button>
            </div>
          </form>
        </div>
      </Main>
    </Layout>
  );
};

export default Edit;
