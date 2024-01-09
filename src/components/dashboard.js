import React, { useContext } from "react";
import ViewTasks from "./viewTasks";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AddTaskForm from "./addTask";

import "../Styling/dashboard.css";
import MyContext from "./context";

const Dashboard = () => {
  const { uName } = useParams();
  const { user } = useContext(MyContext);
  console.log(user);
  const navigate = useNavigate();
  return (
    <div
      style={{ marginTop: "", display: "flex", flexDirection: "column" }}
      className="dashboard"
    >
      <h1 className="app-name">Tick Tick</h1>
      <div class="wrapper">
        <div class="marquee">
          <img src="https://www.svgrepo.com/show/78732/to-do-list.svg" />
          <img src="https://www.svgrepo.com/show/78732/to-do-list.svg" />
          <img src="https://www.svgrepo.com/show/78732/to-do-list.svg" />
          <img src="https://www.svgrepo.com/show/78732/to-do-list.svg" />
          <img src="https://www.svgrepo.com/show/78732/to-do-list.svg" />
          <img src="https://www.svgrepo.com/show/78732/to-do-list.svg" />
        </div>
      </div>
      <h1> {user.userName}</h1>
      {/* <AddTaskForm /> */}
      <div
        onClick={() => {
          navigate(`/addTask/${uName}`);
        }}
        className="btn"
      >
        Add Task
      </div>
      <div style={{ marginTop: "50px" }}>
        <ViewTasks />
      </div>
    </div>
  );
};

export default Dashboard;
