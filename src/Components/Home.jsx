import { useNavigate } from "react-router-dom";
import { useAuth } from "../context";
import { doSignOut } from "../firebase_auth/auth";
import { Link } from "react-router-dom";

const Home = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container">
      {userLoggedIn ? (
        <>
          <div className="text-center d-flex align-items-center justify-content-center">
            <button
              onClick={() => {
                doSignOut().then(() => {
                  navigate("/");
                });
              }}
              className="btn btn-danger m-2"
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <Link className="btn btn-primary m-2" to={"/"}>
            Login
          </Link>
          <Link className="btn btn-primary m-2" to={"/signup"}>
            Register New Account
          </Link>
        </>
      )}
    </div>
  );
};

export default Home;
