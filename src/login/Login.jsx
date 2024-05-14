import { useState } from "react";
import { doSignInWithEmailAndPassword } from "../firebase_auth/auth";
import { useAuth } from "../context";
import { Navigate } from "react-router";

const Login = () => {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
        toast.info("logged in successfully");
      } catch (error) {
        setIsSigningIn(false);
        if (error.code === "auth/user-not-found") {
          setErrorMessage(
            "This email is not registered. Please sign up or check your credentials."
          );
        } else {
          setErrorMessage(
            "Invalid email or password. Please check your credentials and try again."
          );
        }
      }
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to={"/emailverification"} replace={true} />}

      <div className="login template d-flex justify-content-center align-items-center vh-100 aliceblue">
        <div className="form_container p-5 rounded bg-white">
          <form onSubmit={handleSubmit}>
            <h3 className="text-center">Welcome Back</h3>
            <div className="mb-2 row">
              <label htmlFor="email" className="mb-2 col-md-3 col-form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter email"
                className="form-control col-md-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-2 row">
              <label htmlFor="password" className="mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                className="form-control col-md-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {errorMessage && (
              <span className="text-danger font-weight-bold">
                {errorMessage}
              </span>
            )}
            <div className="d-grip m-4 ">
              <button className="btn btn-primary w-100 d-flex justify-content-center mx-auto">
                Login
              </button>
            </div>
          </form>
          <p className="text-right m-4">
            {" "}
            <a href="/forgotpassword"> Forgot Password?</a>
            <a href="/signup" className="m-2">
              Register New Account
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
export default Login;
