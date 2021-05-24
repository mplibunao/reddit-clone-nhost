import React from "react";
import { useRouter } from "next/router";
import { auth } from "utils";
import { useAuth } from "@nhost/react-auth";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const GET_USER_DATA = gql`
  query getUserData($user_id: uuid!) {
    user: users_by_pk(id: $user_id) {
      id
      display_name
    }
  }
`;

const UserHeader = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_USER_DATA, {
    variables: { user_id: auth.getClaim("x-hasura-user-id") },
  });

  if (loading && !data) {
    return <div>Loading..</div>;
  }

  if (error) {
    console.error("error fetching users", error);
    return <div>Error...</div>;
  }

  const { user } = data;

  return (
    <div className="flex items-center">
      <div>{user.display_name}</div>
      <div className="px-1">/</div>
      <div
        className="cursor-pointer"
        onClick={() => {
          auth.logout();
          router.push("/login");
        }}
      >
        logout
      </div>
    </div>
  );
};

export function Header() {
  const { signedIn } = useAuth();

  return (
    <div className="flex items-center justify-between bg-indigo-700 text-white py-4 px-4">
      <div>Reddit Clone</div>
      <div className="flex items-center">
        {signedIn && (
          <div className="px-4">
            <Link href="/new">
              <a>Create post</a>
            </Link>
          </div>
        )}

        <div>
          {signedIn ? (
            <UserHeader />
          ) : (
            <div>
              <Link href="/login">
                <a className="px-4">Login</a>
              </Link>
              <Link href="/register">
                <a>Register</a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Main({ children }) {
  return <div className="container px-4 mx-auto">{children}</div>;
}

export function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
