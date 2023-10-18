import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  };

  return (
    <div className="flex-center min-h-screen bg-light-800 dark:bg-dark-400">
      <form className="card-wrapper p-8 w-96 rounded-lg" onSubmit={login}>
        <h2 className="text-2xl font-bold mb-6 text-primary-500">Login</h2>
        {errors.loginMessage && (
          <h3 className="alert mb-4 text-red-500" role="alert">
            {errors.loginMessage}
          </h3>
        )}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-dark-500"
          >
            Username:
          </label>
          <input
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-dark-500"
          >
            Password:
          </label>
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <input
            className="btn bg-primary-500 text-white w-full p-2 rounded-md hover:bg-primary-600"
            type="submit"
            name="submit"
            value="Log In"
          />
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
