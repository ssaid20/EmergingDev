import React from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../Forms/RegisterForm";

function RegisterPage() {
  const navigate = useNavigate();

  return (
    <div className="flex-center min-h-screen bg-light-800 dark:bg-dark-400">
      <div className="w-96">
        <RegisterForm />
        <center className="mt-4">
          <button
            type="button"
            className="btn text-primary-500 hover:underline"
            onClick={() => {
              navigate("/login", { replace: true });
            }}
          >
            Login
          </button>
        </center>
      </div>
    </div>
  );
}

export default RegisterPage;
