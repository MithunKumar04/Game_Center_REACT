import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginA() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  function validateForm(email, password) {
    if (email === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(email, password)) {
      console.log(`${email}${password}`);
      axios
        .post("https://game-center-react.onrender.com/loginadmin", { email, password })
        .then((result) => {
          console.log(result.data);
          if (result.data === "Incorrect password") {
            toast.error("The password is incorrect.", toastOptions);
          } else if (result.data === "User doesnot exist") {
            toast.error("User does not exist.", toastOptions);
          } else {
            navigate(`/homeadm/${result.data.name}`);
          }
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <>
      <div className="d-flex h-screen w-screen justify-content-center align-items-center bg-cover bg-center vh-100" style={{ backgroundImage: "url('https://wallpapers.com/images/hd/best-gaming-background-d36rt32b2426dgqr.jpg')" }}>
        <div className="bg-white p-3 rounded  ">
          <img src="/game_center.png" alt="image"  height={200} width={350} />
          <h2>Admin Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="off"
                id="email"
                name="email"
                className="form-control rounded-0"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                id="password"
                name="password"
                className="form-control rounded-0"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success w-100 rounded-0">
              Login
            </button>
            <p>New to the website?</p>
            <Link
              to="/registeradmin"
              className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
            >
              Register
            </Link>
            <Link
              to="/"
              className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
            >
              User?
            </Link>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
export default LoginA;
