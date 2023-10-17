import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div>
      <LoginForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            navigate("/registration", { replace: true });
          }}
        >
          Register
        </button>
      </center>
    </div>
  );
}

export default LoginPage;
