import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context";
import { doSignOut } from "../firebase_auth/auth";
import { Link } from "react-router-dom";

const Home = () => {
  const { userLoggedIn, currentUser } = useAuth();
  const navigate = useNavigate();

  // State for form inputs
  const [message, setMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle sending the message, phone number, and name
    console.log("Message:", message);
    console.log("Phone Number:", phoneNumber);
    console.log("Name:", name);
    // Reset form fields
    setMessage("");
    setPhoneNumber("");
    setName("");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 ">
      {userLoggedIn ? (
        <div className="text-center">
          <h2
            className="font-weight-light"
            style={{ fontFamily: "sans-serif" }}
          >
            Hello {currentUser.email || "User"}, Welcome to MailBox Client
            Dashboard!
          </h2>
          {/* Form for sending message */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label ">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="form-control w-50 mx-auto"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                className="form-control w-50 mx-auto"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                id="message"
                className="form-control w-50 mx-auto"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
          <button
            onClick={() => {
              doSignOut().then(() => {
                navigate("/");
              });
            }}
            className="btn btn-danger mt-4"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="text-center">
          <Link className="btn btn-primary m-2" to={"/"}>
            Login
          </Link>
          <Link className="btn btn-primary m-2" to={"/signup"}>
            Register New Account
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
