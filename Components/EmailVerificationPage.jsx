import { toast } from "react-toastify";
import { doSendEmailVerification } from "../firebase_auth/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context";

const EmailVerificationPage = () => {
  const { userLoggedIn, currentUser, sendEmailVerification } = useAuth();
  const navigate = useNavigate();

  // Email Verification section
  const handleSendVerificationEmail = () => {
    console.log("currentUser", currentUser);
    const idToken = currentUser.accessToken;
    const API_KEY = "AIzaSyAGP9CxpZoib8L5VXhReE8Dh1Evb3KnkD8";
    doSendEmailVerification(idToken, API_KEY);
    toast.info("Please check your mail and verify the email for registration.");
  };
  const handleVerifyEmail = () => {
    if (currentUser && currentUser.emailVerified) {
      toast.success("Email verified successfully!");
      window.location.href = "/home";
    } else {
      window.location.reload();
      toast.info("email verification is underway...");
    }
  };
  useEffect(() => {
    if (currentUser && currentUser.emailVerified) {
      window.location.href = "/home";
    }
  }, []);
  return (
    <main
      className="h-100 d-flex align-items-center justify-content-center text-center"
      style={{
        marginTop: "30vh",
        maxWidth: "800px",
        margin: "30vh auto",
      }}
    >
      <div className="w-75 text-gray-600 space-y-5 p-5 shadow-lg rounded-lg text-center">
        <div className="mb-6">
          <h3 className="text-gray-800 text-xl font-weight-bold mb-4">
            Email Verification
          </h3>
        </div>
        <div className="d-flex justify-content-center gap-4">
          <button
            onClick={handleSendVerificationEmail}
            className="w-100 px-4 py-2 text-white font-weight-bold rounded-lg btn btn-info shadow-lg transition duration-300"
          >
            Send Verification Email
          </button>
          <button
            onClick={handleVerifyEmail}
            className="w-100 px-4 py-2 text-white font-weight-bold rounded-lg btn-success btn shadow-lg transition duration-300"
          >
            Verify Email Status
          </button>
        </div>
      </div>
    </main>
  );
};
export default EmailVerificationPage;
