import React from "react";
import "./dashboard.css";

const CourseCard = (props) => {
  const courses = props.users.map((user) => {
    return (
      <div key={user.id} className="course-card">
        <div className="top">
          <h4>{user.courseName}</h4>
          <p>{user.courseLevel}</p>
        </div>
        <p>
          <span className="fa fa-history"></span>
          {user.courseDuration} Weeks
        </p>
        <p style={{ color: "black" }}>status: {user.status}</p>
      </div>
    );
  });
  return <div className="card-wrap">{courses}</div>;
};

export default CourseCard;
