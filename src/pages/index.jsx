import { Layout } from "components/layout";
import { useQuery, gql } from "@apollo/client";
import { useAuth } from "@nhost/react-auth";
import { Main } from "components/layout";
import { Post } from "components/post";

const GET_POSTS = gql`
  query getPosts {
    posts {
      id
      title
      description
      created_at
      user_id
    }
  }
`;

export default function Home() {
  const { signedIn } = useAuth();
  return (
    <Layout>
      <Main>{signedIn ? <ListPosts signedIn={signedIn} /> : null}</Main>
    </Layout>
  );
}

const ListPosts = ({ signedIn }) => {
  const { data, loading, error } = useQuery(GET_POSTS);

  if (loading & !data) {
    return <div>Post loading...</div>;
  }

  if (error) {
    return <div>Error loading posts</div>;
  }

  const { posts } = data;

  return (
    <div className="my-8">
      {posts.map((post) => (
        <Post key={post.id} post={post} signedIn={signedIn} />
      ))}
    </div>
  );
};
