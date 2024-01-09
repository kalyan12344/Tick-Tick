import React, { useEffect, useState } from "react";
// import "./App.css";
import SignUp from "./components/signup.js";
import { db } from "./config/firebase";
import { getDocs, collection } from "firebase/firestore";
import Login from "./components/login.js";
import AddTaskForm from "./components/addTask.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewTasks from "./components/viewTasks.js";
import Dashboard from "./components/dashboard.js";
import UpdateTask from "./components/updateTask.js";
import MyContext from "./components/context.js";

const App = () => {
  const [userData, setUserData] = useState(null);

  return (
    <MyContext.Provider value={{ user: userData }}>
      <div className="">
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path="/Tick-Tick"
              element={<Login setUserData={setUserData} />}
            />
            <Route exact path="/SignUp" element={<SignUp />} />
            <Route exact path="/addTask/:uName" element={<AddTaskForm />} />
            <Route exact path="/viewTasks/:uName" element={<ViewTasks />} />
            <Route exact path="/Dashboard/:uName" element={<Dashboard />} />
            <Route exact path="/update" element={<UpdateTask />} />
          </Routes>
        </BrowserRouter>
        {/* <Dashboard /> */}
      </div>
    </MyContext.Provider>
  );
};

export default App;
