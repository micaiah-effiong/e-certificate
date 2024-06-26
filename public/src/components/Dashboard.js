import React, { Component } from "react";
import SideNav from "./SideNav";
import CourseCard from "./CourseCard";
import "./userprofile.css";
import "./dashboard.css";
import { user } from "./user";
import welcome from "../img/welcome.svg";

class Dashboard extends Component {
  state = {
    users: user,
  };
  render() {
    if (this.state.users === "") {
      return (
        <div className="continer-fluid">
          <SideNav />
          <div className="main">
            <div className="dashboard-header" style={{ textAlign: "center" }}>
              <p>My Courses</p>
            </div>

            <div className="dashboard-section">
              <img src={welcome} alt="welcome" className="img-fluid" />
              <h3>You Have Not Registered a Course</h3>
              <p>
                You have to register a course to get a certificate,<br></br>{" "}
                Please select the course you wish to be certified with
              </p>
              <button href="#" className="fake-btn">
                Browse Courses
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="container-fluid">
        <SideNav />
        <div className="main">
          <div className="dashboard-header" style={{ textAlign: "center" }}>
            <p>My Courses</p>
          </div>

          <div className="dashboard-section">
            <div className="container card-wrap">
              <CourseCard users={this.state.users} />
            </div>
            <button className="fake-btn" href="https://rex.com">
              Add New Courses
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
