import { Layout, Main } from "components/layout";
import { useMutation, gql } from "@apollo/client";
import { useForm } from "react-hook-form";

const CREATE_POST = gql`
  mutation insertPost($post: posts_insert_input!) {
    insert_posts(objects: [$post]) {
      affected_rows
    }
  }
`;

export default function Home({
  defaultValues = { title: "", description: "" },
}) {
  const { register, handleSubmit } = useForm({
    defaultValues,
    mode: "onBlur",
  });

  const [createPost] = useMutation(CREATE_POST);

  const onSubmit = async (post) => {
    try {
      await createPost({ variables: { post } });
      alert("post created");
    } catch (err) {
      alert("post creation failed");
      console.error(error);
      return console.error(error);
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
                Create post
              </button>
            </div>
          </form>
        </div>
      </Main>
    </Layout>
  );
}
