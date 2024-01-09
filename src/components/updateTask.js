import React, { useState } from "react";
import { useActionData, useLocation, useNavigate } from "react-router-dom";
import "../Styling/updateTask.css";
import { TextField } from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { Translate } from "@mui/icons-material";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { Navigate } from "react-router-dom";

const UpdateTask = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { task } = location.state || {};
  const documentRef = doc(db, "Task", task.id);

  const user = task?.userName;
  const today = new Date();
  const dateString = today.toISOString().split("T")[0];
  const dateObject = new Date(dateString);
  console.log(user);
  const [endDate, setEndDate] = useState(task.endDate);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);

  function convertDateFormat(dateString) {
    const parts = dateString.split("/");
    if (parts.length !== 3) return null;
    const newDate = new Date(parts[2], parts[0] - 1, parts[1]);
    console.log(newDate);
    return newDate.toISOString().split("T")[0];
  }

  const handleUpdate = async () => {
    console.log(typeof dateString); // Make sure this is what you expect
    console.log(typeof endDate); // Same here

    const endDateString = convertDateFormat(endDate);

    // if (!endDateString) {
    //   console.error("Invalid end date format");
    //   return; // or handle the error accordingly
    // }

    try {
      await updateDoc(documentRef, {
        title: title,
        isCompleted: isCompleted,
        description: description,
        completionDate: isCompleted ? dateString : null,
        endDate: endDateString,
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
    navigate(`/Dashboard/${user}`);

    console.log(title, description, endDate, isCompleted);
  };
  return (
    <div>
      <div className="form">
        <p id="heading">Update Task</p>
        <div class="field">
          <input
            name="title"
            value={title}
            autocomplete="off"
            placeholder="Title"
            className="input-field"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="field">
          <textarea
            name="description"
            placeholder="Description"
            className="input-field-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <h5 className="end-date">END DATE:</h5>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{
                ".MuiInputBase-root": {
                  border: "none",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                },
                ".MuiInputBase-input": {
                  color: "white",
                },
                ".MuiSvgIcon-root": {
                  color: "white",
                },
                width: "200px",
              }}
              label=""
              name="endDate"
              className="input-field-date"
              value={dayjs(endDate)}
              onChange={(newDate) => {
                const formattedDate = newDate.format("MM/DD/YYYY");

                setEndDate(formattedDate);
                console.log(formattedDate);
              }}
            />
          </LocalizationProvider>
        </div>
        <div class="radio-input" style={{ alignItems: "center" }}>
          <Checkbox
            icon={<RadioButtonUncheckedIcon />}
            name="isCompleted"
            checkedIcon={<RadioButtonCheckedIcon color="success" />}
            sx={{
              color: "grey",
              "&.Mui-checked": {
                color: "blue",
              },
            }}
            onClick={(e) => setIsCompleted(e.target.checked)}
          />

          <p>Completed</p>
        </div>

        <button className="button3" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateTask;
