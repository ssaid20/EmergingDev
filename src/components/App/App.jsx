import React, { useEffect } from "react";
import { useNavigate, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AboutPage from "../AboutPage/AboutPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import AskQuestion from "../Ask-Question/Ask-Question";
import Layout from "../Layout/Layout";
import Collection from "../Collection/Collection";
import Community from "../Community/Community";
import Home from "../Home/Home";
import Profile from "../Profile/Profile";
import Tags from "../Tags/Tags";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  useEffect(() => {
    // If the current path is the root, navigate to /home
    if (window.location.pathname === "/") {
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  return (
    <div>
      {/* <Nav /> */}
      <Layout>
        <Routes>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          {/* <Navigate exact from="/" to="/home" replace /> */}

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
            element={<AboutPage />}
          />

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <Route
            path="/home"
            element={<ProtectedRoute element={<Home />} />}
          />

          <Route
            path="/ask-question"
            element={<ProtectedRoute element={<AskQuestion />} />}
          />
          <Route
            path="/collection"
            element={<ProtectedRoute element={<Collection />} />}
          />
          <Route
            path="/community"
            element={<ProtectedRoute element={<Community />} />}
          />
          <Route
            path="/user"
            element={<ProtectedRoute element={<Profile />} />}
          />
          <Route
            path="/tags"
            element={<ProtectedRoute element={<Tags />} />}
          />

          <Route
            exact
            path="/login"
            element={
              user.id ? (
                // If the user is already logged in,
                // redirect to the /user page
                <Navigate to="/user" replace />
              ) : (
                // Otherwise, show the login page
                <LoginPage />
              )
            }
          />

          <Route
            exact
            path="/registration"
            element={
              user.id ? (
                // If the user is already logged in,
                // redirect to the /user page
                <Navigate to="/user" replace />
              ) : (
                // Otherwise, show the registration page
                <RegisterPage />
              )
            }
          />

          <Route
            exact
            path="/home"
            element={
              user.id ? (
                // If the user is already logged in,
                // redirect to the /user page
                <Navigate to="/user" replace />
              ) : (
                // Otherwise, show the Landing page
                <LandingPage />
              )
            }
          />

          {/* If none of the other routes matched, we will show a 404. */}
          {/* <Route>
            <h1>404</h1>
          </Route> */}
        </Routes>
      </Layout>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
