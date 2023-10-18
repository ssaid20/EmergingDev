import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="flex-center min-h-screen bg-light-800 dark:bg-dark-400">
      <div className="w-96">
        <LoginForm />
        <center className="mt-4">
          <button
            type="button"
            className="btn text-primary-500 hover:underline"
            onClick={() => {
              navigate("/registration", { replace: true });
            }}
          >
            Register
          </button>
        </center>
      </div>
    </div>
  );
}

export default LoginPage;
