import React, { useContext, useEffect, useState } from "react";
import "../Styling/addTask.css";
import axios from "axios";

import {
  Navigate,
  useInRouterContext,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { TextField, Typography } from "@mui/material";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../config/firebase";

const AddTaskForm = () => {
  const { uName } = useParams();
  console.log(uName);
  const tasksCollection = collection(db, "Task");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const today = new Date();
  const dateString = today.toISOString().split("T")[0];
  const dateObject = new Date(dateString);
  const [taskList, setTaskList] = useState([]);
  const navigate = useNavigate();

  const sendEmail = async (emailDetails) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/send-email",
        emailDetails
      );
      console.log("Email sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  // Example usage

  console.log(uName, title, description, endDate, dateString);
  useEffect(() => {
    const getUserList = async () => {
      try {
        const data = await getDocs(tasksCollection);
        const tasks = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTaskList(tasks);
      } catch (error) {
        console.error(error);
      }
    };

    getUserList();
  }, []);

  console.log(taskList);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(tasksCollection, {
      userName: uName,
      title: title,
      description: description,
      startDate: dateString,
      endDate: endDate,
      isCompleted: false,
    });
    sendEmail({
      to: "kalyanraju90@gmail.com",
      subject: "Test Email",
      text: "This is a test email",
      html: "<strong>This is a test email</strong>",
    });
    navigate(`/Dashboard/${uName}`);
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="form-container">
        <h1>Add Task</h1>
        <form className="form" onSubmit={handleSubmit}>
          <TextField
            label="title"
            variant="outlined"
            className="form-group"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <TextField
            label="Description"
            variant="outlined"
            className="form-group"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />

          {/* <TextField
            label=""
            variant="outlined"
            type="date"
            className="form-group"
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          /> */}
          <TextField
            label=""
            variant="outlined"
            type="date"
            className="form-group"
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />

          <button className="form-submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;
