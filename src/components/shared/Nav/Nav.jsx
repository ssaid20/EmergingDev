import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import GlobalSearch from "../Search/GlobalSearch";
import MobileNav from "./MobileNav";
import Theme from "./Theme";
function Nav() {
  const user = useSelector((store) => store.user);
  return (
    //fixed z-50
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link to="/home" className="flex items-center gap-1">
        {/* <h2 className="nav-title">Secure Submarine</h2> */}
        <img
          src="/assets/images/site-logo.svg"
          width={33}
          height={33}
          alt="EmergingDev"
        />
        <p className="h2-bold font-spaceGrotesk text-blue-700">
          Emerging{" "}
          <span
            className="h2-bold font-spaceGrotesk text-dark-100
         dark:text-light-900 max-sm:hidden"
          >
            Dev
          </span>
        </p>
      </Link>

      <GlobalSearch />

      <div className="flex-between gap-5">
        <Theme />
        {/* If no user is logged in, show these links */}
        {/* {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )} */}
        {/* If a user is logged in, show these links
        {user.id && (
          <>

            <LogOutButton className="navLink" />
          </>
        )} */}
        <MobileNav />
      </div>
    </nav>
  );
}

export default Nav;
