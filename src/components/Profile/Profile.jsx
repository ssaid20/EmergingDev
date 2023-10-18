import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";

function Profile() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <>
      <div className="bg-light-850 dark:bg-dark-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-dark-400 dark:text-light-900 mb-4">
          Your username is: {user.username}!
        </h2>
        <p className="text-xl font-medium text-dark-300 dark:text-light-800 mb-6">
          Your ID is: {user.id}
        </p>
        <LogOutButton className="btn bg-blue-500 dark:bg-dark-300 text-white py-2 px-4 rounded" />
      </div>
    </>
  );
}
// this allows us to use <App /> in index.js
export default Profile;
