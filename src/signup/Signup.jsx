import { useEffect, useState } from "react";
import { doCreateUserWithEmailAndPassword } from "../firebase_auth/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const { userLoggedIn } = useAuth();
  // console.log(userLoggedIn);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrorMessage("");
    setIsRegistering(false);
  };

  useEffect(() => {
    resetForm();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match!");
        setIsRegistering(false);
        // resetForm();
        return;
      }
      try {
        await doCreateUserWithEmailAndPassword(name, email, password);
        toast.success("Account is created successfully");
        resetForm();
      } catch (error) {
        setIsRegistering(false);
        if (error.code === "auth/email-already-in-use") {
          setErrorMessage(
            "This email is already registered. Please use a different email address or log in using this email."
          );
        } else {
          setErrorMessage("An error occurred. Please try again later.");
        }
      }
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to={"/"} replace={true} />}

      <div className="login  template d-flex justify-content-center align-items-center vh-100 aliceblue">
        <div className="form_container p-5 rounded bg-white">
          <form onSubmit={handleSubmit}>
            <h3 className="text-center">Create New Account</h3>
            <div className="mb-2 row">
              <label htmlFor="name" className="mb-2 col-md-3  col-form-label">
                Name
              </label>
              <input
                type="name"
                name="name"
                id="name"
                placeholder="Enter your name"
                className="form-control col-md-3"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
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
                placeholder="Enter password"
                className="form-control col-md-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-2 row">
              <label htmlFor="confirm_password" className="mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                placeholder="Enter same password again"
                className="form-control col-md-3"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <input
                type="checkbox"
                className="custom-control custom-checkbox"
                id="check"
              />
              <label htmlFor="check" className="custom-input-label ms-2">
                Remember me
              </label>
            </div>
            <div className="d-grip m-4">
              <button className="btn btn-success  w-100  text-center  justify-content-center d-flex mx-auto">
                Sign Up
              </button>
            </div>
          </form>

          {errorMessage && (
            <span className="text-danger font-weight-bold">{errorMessage}</span>
          )}

          <p className="text-right m-2">
            {" "}
            already have an account ?
            <a href="/" className="m-2">
              continue
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
export default Signup;
