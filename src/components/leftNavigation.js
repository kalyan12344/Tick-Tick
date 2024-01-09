import React from "react";
import { Link } from "react-router-dom";

const LeftNavigation = () => {
  return (
    <div className="left-nav">
      <Link to="/">Home</Link>
      <Link to="/tasks">Tasks</Link>
      <Link to="/completed">Completed</Link>
      <Link to="/settings">Settings</Link>
    </div>
  );
};

export default LeftNavigation;
