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
import Home from "../Home/Home";
import Profile from "../Profile/Profile";
import Tags from "../Tags/Tags";
import QuestionDetails from "../QuestionDetails/QuestionDetails";
import QuestionEdit from "../shared/QuestionEdit";
import AnswerEdit from "../shared/AnswerEdit";
import { useParams } from "react-router-dom";
import ProfileEdit from "../Forms/ProfileEdit";
import TagDetails from "../TagDetails.jsx/TagDetails";

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
          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
            element={<AboutPage />}
          />

          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />

          <Route
            path="/ask-question"
            element={<ProtectedRoute element={<AskQuestion />} />}
          />
          <Route
            path="/collection"
            element={<ProtectedRoute element={<Collection />} />}
          />
          <Route
            path="/user"
            element={<ProtectedRoute element={<Profile />} />}
          />
          <Route path="/tags" element={<ProtectedRoute element={<Tags />} />} />
          <Route path="/question/:id" element={<ProtectedRoute element={<QuestionDetails />} />} />
          <Route path="/question/edit/:id" element={<ProtectedRoute element={<QuestionEdit />} />} />
          <Route path="/user/edit/" element={<ProtectedRoute element={<ProfileEdit />} />} />
          <Route path="/answer/edit/:id" element={<ProtectedRoute element={<AnswerEdit />}/>} />
          <Route path="/tags/:tagId" element={<ProtectedRoute element={<TagDetails />} />} />
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
