import React from "react";
import "./Navbar.css";

const Navbar = ({ setSearch }) => {
  return (
    <div className="nav">
      <div className="right">
        <h1>Pixabay Infinite Gallery</h1>
      </div>
      <div className="left">
        <input
          type="text"
          placeholder="🔍 Search for images..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Navbar;
