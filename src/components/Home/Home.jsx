import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((store) => store.user);
  return (
    <div>
      <h2 className="h1-bold text-dark100_light900">
        Welcome, {user.username}!
      </h2>
    </div>
  );
};

export default Home;
