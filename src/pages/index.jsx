import { Layout } from "components/layout";
import { useSubscription, gql } from "@apollo/client";
import { useAuth } from "@nhost/react-auth";
import { Main } from "components/layout";
import { Post } from "components/post";
import { auth } from "utils";

const GET_POSTS = gql`
  subscription getPosts($user_id: uuid!) {
    posts {
      id
      title
      description
      created_at
      user_id
      user {
        id
        display_name
      }
      post_votes_aggregate {
        aggregate {
          sum {
            vote_type
          }
        }
      }
      post_votes(where: { user_id: { _eq: $user_id } }) {
        id
        vote_type
      }
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
  const { data, loading, error } = useSubscription(GET_POSTS, {
    variables: { user_id: auth.getClaim("x-hasura-user-id") },
  });

  if (loading & !data) {
    return <div>Post loading...</div>;
  }

  if (error) {
    console.log("error", error); // eslint-disable-line no-console
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
