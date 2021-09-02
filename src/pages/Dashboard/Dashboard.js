import React from "react";
import "./Dashboard.css";
import ImgSrc from "./../../shared/ImgSrc";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <section className="dashboard">
      <div className="dashboard__user">
        <div className="dashboard__user--main">
          <img src={ImgSrc.userDash} alt="user profile" />
          <h1>Test Test</h1>
        </div>
        <div className="dashboard__user--details">
          <h2>Email : test@test.com</h2>
          <h2>Tutored By : 2</h2>
          <h2>Teaching : 5</h2>
          <h2>Rating : 5</h2>
        </div>
      </div>

      {/* Dashboard Tools */}
      <div className="dashboard__tools">
        <div className="dashboard__tools--container dashboard__tools--container-1">
          <img src={ImgSrc.lecturesDash} alt="icon" />
          <Link to="/class">Classes</Link>
        </div>
        <div className="dashboard__tools--container dashboard__tools--container-2">
          <img src={ImgSrc.quizDash} alt="icon" />
          <Link to="/quiz">Quiz</Link>
        </div>
        <div className="dashboard__tools--container dashboard__tools--container-3">
          <img src={ImgSrc.tutorDash} alt="icon" />
          <Link to="/my_tutor">My Tutor</Link>
        </div>
        <div className="dashboard__tools--container dashboard__tools--container-4">
          <img src={ImgSrc.tuteeDash} alt="icon" />
          <Link to="/my_tutee">My Tutee</Link>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
