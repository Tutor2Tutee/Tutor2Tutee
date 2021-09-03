import React from "react";
import { Link } from 'react-router-dom'
import "./NotFound.css";

const NotFound = () => {
  return (
    <section className="notfound_container">
      <section class="error-container">
        <span>4</span>
        <span><span class="screen-reader-text">0</span></span>
        <span>4</span>
      </section>
      <div class="link-container">
        <Link to="/dashboard" class="more-link">Go To Dashboard</Link>
      </div>
    </section>
  );
};

export default NotFound;
