"use client";

import { providers, signIn, getSession, csrfToken } from "next-auth/client";

function login({ providers }) {
  return (
    <div>
      {Object.values(providers).map((provider) => {
        return (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default login;

export async function getServerSideProps(context) {
  return {
    props: {
      providers: await providers(context),
    },
  };
}