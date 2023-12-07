import React from "react";

const LoadingComponent = () => {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <p>Loading...</p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  spinner: {
    border: "4px solid rgba(0, 0, 0, 0.1)",
    borderLeft: "4px solid #000",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    animation: "spin 1s linear infinite",
  },
};

export default LoadingComponent;
