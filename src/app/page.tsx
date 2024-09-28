"use client";

import { signIn } from "next-auth/react";

const Home: React.FC = () => {
  return (
    <div>
      <div className="home-page">
        <h2>Home</h2>
        <div>
          {/* <SignIn className="signin-button" /> */}
          <button className="signin-button" onClick={async () => await signIn()}>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
