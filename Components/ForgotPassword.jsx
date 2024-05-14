import { useState } from "react";
import { useAuth } from "../context";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../firebase_auth/firebase";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { sendEmailVerification } = useAuth(); // Import the sendEmailVerification function from your AuthContext

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailVal = email.trim();

    try {
      await sendPasswordResetEmail(auth, emailVal);
      // You can add a message or redirect the user to a confirmation page here
      toast.success("Password reset email sent successfully!");
    } catch (error) {
      toast.error("Error sending password reset email:", error.message);
      // Handle error (optional)
    }
  };

  return (
    <main className="template d-flex justify-content-center align-items-center vh-100 aliceblue">
      <div className="form_container p-5 rounded bg-white">
        <div className="text-center mb-6">
          <div className="mt-2">
            <h3 className="text-gray-800 text-xl font-weight-bold">
              Forgot Password
            </h3>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label
              htmlFor="email"
              className="text-sm text-gray-600 font-weight-bold mb-2"
            >
              Enter Your Email
            </label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              name="email"
              placeholder="write your registered email here"
              required
              value={email}
              onChange={handleEmailChange}
              className="form-control col-md-3 mb-4"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg btn-block  d-flex mx-auto mb-4"
          >
            Reset Password
          </button>
          <Link to="/" className="text-decoration-none">
            <button type="submit" className="btn btn-success d-flex mx-auto">
              Go to Login Page
            </button>
          </Link>
        </form>
      </div>
    </main>
  );
};

export default ForgotPassword;
