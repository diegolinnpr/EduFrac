import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import ThreeScene from "./ThreeScene";
function FractalCanvas({ type }) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",            // enable flexbox
        flexDirection: "column",    // stack vertically
        backgroundColor: "#111",
        color: "white",
        height: "100%",             // ensure full height
      }}
    >
      <h2 style={{ margin: "10px" }}>
        {type} Fractal Here
      </h2>

      {/* This wrapper will expand */}
      <div style={{ flex: 1 }}>
        <ThreeScene />
      </div>
    </div>
  );
}
export default FractalCanvas;