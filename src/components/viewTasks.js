import React, { useState, useEffect } from "react";
import { auth, db } from "../config/firebase";
import { Box } from "@mui/material/Box";
import Button from "@mui/material/Button";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Card, CardContent } from "@mui/material";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";
import SentimentSatisfiedRoundedIcon from "@mui/icons-material/SentimentSatisfiedRounded";
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";
import UpdateTask from "./updateTask";
import { SentimentDissatisfied } from "@mui/icons-material";
const ViewTasks = () => {
  const { uName } = useParams();
  const [tasksList, setTasksList] = useState([]);
  const navigate = useNavigate();
  var col;

  //   console.log(userData.userName);
  useEffect(() => {
    const getTasks = async () => {
      const tasksCollection = collection(db, "Task");
      const allTasks = await getDocs(tasksCollection);

      const filteredTasks = allTasks.docs
        .filter(
          (doc) => doc?.data()?.userName?.toLowerCase() === uName?.toLowerCase()
        )
        .map((doc) => ({ ...doc.data(), id: doc.id }));

      setTasksList(filteredTasks);
    };

    getTasks();
  }, []);

  console.log(tasksList);
  const handleClick = (task) => {
    navigate("/update", { state: { task } });
    console.log(task);
  };

  return (
    <div style={{ backgroundColor: "" }}>
      {/* <h1>{userData.userName}</h1> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "50px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {tasksList.map((task) => {
          console.log(task);
          const taskTitle = task.title;
          const isCompleted = task?.isCompleted;

          var icon;
          if (isCompleted) {
            if (task.completionDate <= task.endDate) {
              icon = <SentimentSatisfiedRoundedIcon />;
              col = "success";
            } else {
              icon = <SentimentDissatisfied />;

              col = "error";
            }
          } else {
            icon = <SentimentSatisfiedRoundedIcon />;

            col = "warning";
          }

          return (
            // <Card sx={{ width: "200px" }} style={cardStyle} key={task?.id}>
            //   <CardContent>
            //     <h1 style={{ color: "black" }}>{task?.title}</h1>
            //     <p>{task?.description}</p>
            //   </CardContent>
            // </Card>
            <Chip
              sx={{ minWidth: "150px", height: "50px", borderRadius: "50px" }}
              label={taskTitle}
              deleteIcon={<DoneIcon />}
              icon={icon}
              color={col}
              clickable
              onClick={() => handleClick(task)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ViewTasks;
