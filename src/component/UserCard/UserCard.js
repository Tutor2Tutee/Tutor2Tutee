import React from "react";
import "./UserCard.css";
import ImgSrc from "./../../shared/ImgSrc";

const COLOR_GRAD = [
  {
    bg: "linear-gradient(to right, #4ed7dc, #3dabe2, #5782e8)",
    col: "#3dabe2",
  },
  {
    bg: "linear-gradient(to right, #f15e99, #f25f8a, #f36d7b)",
    col: "#f25f8a",
  },
  {
    bg: "linear-gradient(to right, #61dd99, #53caa7, #44b8b2)",
    col: "#53caa7",
  },
];

function UserCard() {
  return (
    <div
      style={{ background: COLOR_GRAD[Math.floor(Math.random() * 3)].bg }}
      className="user__profile--card"
    >
      <img src={ImgSrc.userDash} alt="profile" />
      <h1>Test Test</h1>
      <h1>test@test.com</h1>
      <h1>03/10/2001</h1>
      <h1>Points : 40</h1>
      <h1>Listening : 15</h1>
      <h1>Teaching : 45</h1>
    </div>
  );
}

export default UserCard;
