import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loginMutation, isPending, error } = useLogin();

  const handleSignup = (e) => {
    e.preventDefault();
    loginMutation(formData);
  };

  return (
    <div className="h-screen w-full flexCenter">
      <div className="card card-side bg-base-100 card-border border-base-300 card-sm max-w-200 gap-6 p-3">
        {/* LEFT SIDE */}
        <div className="card-body w-full">
          {/* LOGO */}
          <div className="flexCenter gap-1">
            <img src="/logo.png" alt="logo" height={33} width={33} />
            <h3 className="hidden sm:block">ingpong</h3>
          </div>
          {error && (
            <div className="alert alert-error mb-4">
              <span>
                {error.response?.data?.message ||
                  "Unable to connect to the server. Please try again."}
              </span>
            </div>
          )}
          {/* FORM */}
          <form onSubmit={handleSignup} className="mt-6">
            <h2 className="card-title">Welcome Back</h2>
            <p className="para">
              Welcome to Pingpong. Please fill in the form below to login to
              your account.
            </p>
            <div className="my-8">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Email</legend>
                <label className="input validator">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </g>
                  </svg>
                  <input
                    type="email"
                    placeholder="mail@site.com"
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    value={formData.email}
                  />
                </label>
                <div className="validator-hint hidden">
                  Enter valid email address
                </div>
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Password</legend>
                <label className="input validator">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                      <circle
                        cx="16.5"
                        cy="7.5"
                        r=".5"
                        fill="currentColor"
                      ></circle>
                    </g>
                  </svg>
                  <input
                    type="password"
                    required
                    placeholder="Password"
                    minLength="8"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    value={formData.password}
                  />
                </label>
                <p className="validator-hint hidden">
                  Must be more than 8 characters, including
                  <br />
                  At least one number <br />
                  At least one lowercase letter <br />
                  At least one uppercase letter
                </p>
              </fieldset>
              <label className="label mt-2">
                <input
                  type="checkbox"
                  required
                  className="checkbox checkbox-xs"
                />
                Remember me.
              </label>
            </div>
            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={isPending}
            >
              {isPending && <span className="loading loading-spinner" />} Login
            </button>
            <p className="text-sm mt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Create one
              </Link>
            </p>
          </form>
        </div>
        {/* RIGHT SIDE */}
        <figure className="max-w-sm hidden sm:block">
          <img
            src="/loginImg.jpg"
            alt="img"
            className="object-cover rounded-xl"
          />
        </figure>
      </div>
    </div>
  );
};

export default LoginPage;
