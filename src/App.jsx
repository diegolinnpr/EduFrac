import React from "react";

// This is a component.
// It is just a normal JavaScript function.
function App() {

  // The function must RETURN JSX.
  // JSX looks like HTML but is actually JavaScript.
  return (
    <div>
      {/* This is JSX */}
      <h1>Interactive Fractals Explorer</h1>
      <p>This will display fractals on the left side soon!</p>
      <p>Zoom, explore, and generate interactive chaos game visualizations!</p>
      <button>Generate Fractal</button>
    </div>
  );
}

// We export the component so other files can use it
export default App;
