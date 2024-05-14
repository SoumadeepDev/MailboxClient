import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context";
import EmailVerificationPage from "./Components/EmailVerificationPage";
import ForgotPassword from "./Components/ForgotPassword";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer pauseOnHover autoClose={2000} position="top-right" />
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/emailverification"
            element={<EmailVerificationPage />}
          />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
