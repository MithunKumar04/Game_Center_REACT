import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegisterA() {
  const [name, setName] = useState("");
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

  function validateForm(name, email, password) {
    if (name === "") {
      toast.error("Name is required.", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Password is required.", toastOptions);
      return false;
    }
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(name, email, password)) {
      console.log(`${name}${email}${password}`);
      axios
        .post("https://game-center-react.onrender.com/registeradmin", {
          name,
          email,
          password,
        })
        .then((result) => {
          if (result.data === "User Aleady Exist") {
            toast.error("User already Exist.", toastOptions);
          } else {
            console.log(result);
            navigate("/loginadmin");
          }
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <>
      <div
        className="d-flex h-screen w-screen justify-content-center align-items-center bg-cover bg-center vh-100"
        style={{
          backgroundImage:
            "url('https://wallpapers.com/images/hd/best-gaming-background-d36rt32b2426dgqr.jpg')",
        }}
      >
        <div className="bg-white p-3 rounded">
          <img src="https://dypdvfcjkqkg2.cloudfront.net/large/1485049-182.png" alt="image" height={200} width={350} />
          <h2>Admin Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name">
                <strong>Name </strong>
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                autoComplete="off"
                name="name"
                id="name"
                className="form-control rounded-0"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
              Register
            </button>
            <p>Already have an account?</p>
            <Link
              to="/loginadmin"
              className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
            >
              Login
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
export default RegisterA;
