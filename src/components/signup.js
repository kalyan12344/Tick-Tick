import React, { useState, useEffect } from "react";
import { auth, db } from "../config/firebase";
import { Box } from "@mui/material/Box";
import Button from "@mui/material/Button";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import TextField from "@mui/material/TextField";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [phonenumber, setMobileNumber] = useState("");
  const [isEmailAvail, setIsEmailAvail] = useState(false);
  const [isUnameAvail, setIsUnameAvail] = useState(false);
  const [userList, setUserList] = useState([]);

  const usersCollection = collection(db, "user");
  useEffect(() => {
    const getUserList = async () => {
      try {
        const data = await getDocs(usersCollection);
        const onlyUsers = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUserList(onlyUsers);

        console.log(userList);
      } catch (error) {
        console.error(error);
      }
    };
    getUserList();
  }, []);
  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const qEmail = query(usersCollection, where("email", "==", email));
      const querySnapshotEmail = await getDocs(qEmail);
      const qUname = query(usersCollection, where("userName", "==", userName));
      const querySnapshotUname = await getDocs(qUname);
      if (querySnapshotEmail.size === 0) {
        setIsEmailAvail(false);
      } else {
        setIsEmailAvail(true);
      }

      if (querySnapshotUname.size === 0) {
        setIsUnameAvail(false);
      } else {
        setIsUnameAvail(true);
      }
      console.log(isEmailAvail, isUnameAvail);
      if (!isEmailAvail && !isUnameAvail) {
        console.log("user Added");
        await addDoc(usersCollection, {
          email: email.toLowerCase(),
          userName: userName.toLowerCase(),
          Age: age,
          phoneNumber: phonenumber,
          password: password,
        });

        setEmail("");
        setUserName("");
        setPassword("");
        setAge("");
        setMobileNumber("");
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
    setEmail("");
    setUserName("");
    setPassword("");
    setAge("");
    setMobileNumber("");
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <TextField
          id="Email"
          label="Email"
          variant="outlined"
          value={email}
          error={isEmailAvail}
          helperText={isEmailAvail ? "Email Already Exists" : ""}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginRight: "20px" }}
        />
        <TextField
          id="Username"
          label="Username"
          variant="outlined"
          error={isUnameAvail}
          helperText={isUnameAvail ? "Username Already Exists" : ""}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          sx={{ marginBottom: "20px" }}
        />

        <br />
        <TextField
          id="password"
          type="password"
          label="Password"
          value={password}
          sx={{ marginBottom: "20px" }}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <TextField
          id="Age"
          type="number"
          label="Age"
          value={age}
          sx={{ marginRight: "20px" }}
          onChange={(e) => setAge(e.target.value)}
        />
        <TextField
          id="Mobile-Number"
          type="number"
          label="Mobile Number"
          value={phonenumber}
          sx={{ marginBottom: "50px" }}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
        <br />
        <Button type="submit" color="secondary" variant="contained">
          submit
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
