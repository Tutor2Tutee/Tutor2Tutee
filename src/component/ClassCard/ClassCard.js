import React from "react";
import "./ClassCard.css";
import { Link } from "react-router-dom";

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
  {
    bg: "linear-gradient(to right, #ffce44, #fbb04b, #f78f52)",
    col: "#fbb04b",
  },
];

function ClassCard({ number, isAllClass }) {
  return (
    <div
      style={{ background: COLOR_GRAD[number].bg }}
      className="create__classes--card"
    >
      <ul>
        <li>Name : Python Masterclass</li>
        <li>Teacher : Test Test</li>
        <li>Number of Listners : 10/10</li>
        <li>Rating : 5</li>
        <li>Class Type : Online Lecture</li>
        <li>
          <label>Description :</label>
          <p>
            Python Masterclass will be taken on every sunday. Someone who wants
            to learn about python can join.
          </p>
        </li>
      </ul>
      <Link to="/class/all/id" style={{ color: COLOR_GRAD[number].col }}>
        More Details
      </Link>
      {isAllClass && (
        <Link
          to="/class/all/id"
          style={{
            color: COLOR_GRAD[number].col,
            marginLeft: "1rem",
            padding: ".5rem 3rem",
          }}
        >
          Join
        </Link>
      )}
    </div>
  );
}

export default ClassCard;
