import React, { createContext, useContext, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import MyContext from "./context";
import "../Styling/login.css";

const Login = ({ setUserData }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isErrorPassword, setIsErrorpassword] = useState(false);
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Fetch the user document with the provided email
      const usersCollection = collection(db, "user");
      const q = query(
        usersCollection,
        where("email", "==", email.toLowerCase())
      );
      const querySnapshot = await getDocs(q);

      // Check if a user with the provided email exists
      if (querySnapshot.size === 0) {
        setIsErrorEmail(true);
        setError("Please check your email.");
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      // Check if the provided password matches the stored passwordHash (You should use secure password hashing)
      if (userData.password === password) {
        setUserData(userData);
        navigate(`/Dashboard/${userData.userName}`);

        // Authentication successful
        setError("");
        setEmail("");
        setPassword("");
      } else {
        setIsErrorpassword(true);
        setError("Incorrect password. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
      setError("Error logging in. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <form className="">
        <div className="">
          <TextField
            type="text"
            variant="standard"
            placeholder=""
            error={isErrorEmail}
            helperText={isErrorEmail ? error : ""}
            label="Email"
            value={email}
            sx={{ width: "30ch" }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="">
          <TextField
            type="password"
            variant="standard"
            placeholder=""
            label="Password"
            error={isErrorPassword}
            helperText={isErrorPassword ? error : ""}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: "30px", marginTop: "30px", width: "30ch" }}
          />
        </div>
        <div className="buttons">
          <Button onClick={handleLogin} type="submit" variant="contained">
            Login
          </Button>
          <div className="signup">
            {" "}
            <p>new User?</p>
            <Button variant="contained" onClick={() => navigate("/SignUp")}>
              Signup
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
