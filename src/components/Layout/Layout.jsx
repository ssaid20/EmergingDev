import React from 'react';
import { useSelector } from "react-redux";
import LeftSidebar from '../shared/LeftSidebar';
import Nav from '../shared/Nav/Nav';
import LogOutButton from '../LogOutButton/LogOutButton'; 
import LoginPage from '../LoginPage/LoginPage';

const Layout = ({ children }) => {
  const user = useSelector((store) => store.user);

  return (
    <>
      {/* If no user is logged in, show these links */}
      {!user.id && (
          <LoginPage />
      )}

      {/* If a user is logged in, show the main layout */}
      {user.id && (
        <>
          <main className="background-light850_dark100 relative">
            <Nav />
            <div className="flex">
              <LeftSidebar />

              <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
                <div className="mx-auto w-full max-w-5xl">
                  {children}
                </div>
              </section>

              {/* RightSidebar */}
            </div>

            {/* <Toaster /> */}
          </main>
          <LogOutButton className="navLink" />
        </>
      )}
    </>
  );
}

export default Layout;
