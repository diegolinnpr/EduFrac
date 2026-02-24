function Controls({ setFractalType }) {
  return (
    <div style={{ width: "300px", padding: "20px", backgroundColor: "#eee" }}>
      <button onClick={() => setFractalType("Octahedron")}>
        Octahedron
      </button>

      <br /><br />

      <button onClick={() => setFractalType("Square")}>
        Square
      </button>
    </div>
  );
}
export default Controls;