import React from "react";
import { useRouter } from "next/router";
import { auth } from "utils";

export function Header() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between bg-indigo-700 text-white py-4 px-4">
      <div>Reddit Clone</div>
      <div className="flex items-center">
        {auth.isAuthenticated() && <div className="px-4">Create post</div>}

        <div>
          User /{" "}
          <span
            className="cursor-pointer"
            onClick={() => {
              auth.logout();
              router.push("/login");
            }}
          >
            logout
          </span>
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
