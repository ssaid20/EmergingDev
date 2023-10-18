import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";
import LeftSidebar from "../LeftSidebar";
function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <nav className="flex-between background-light900_dark200 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link to="/home" className="flex items-center gap-1">
        {/* <h2 className="nav-title">Secure Submarine</h2> */}
        <img
          src="/assets/images/site-logo.svg"
          width={33}
          height={33}
          alt="EmergingDev"
        />
        <p className="h2-bold font-spaceGrotesk text-purple-700">
          Emerging{" "}
          <span
            className="h2-bold font-spaceGrotesk text-dark-100
         dark:text-light-900 max-sm:hidden"
          >
            Dev
          </span>
        </p>
      </Link>

      GlobalSearch

      <div className="flex-between gap-5">

        Theme

        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/info">
              Info Page
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
