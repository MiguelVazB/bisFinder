import React from "react";

const NotFoundPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Not Found</h1>
      <p style={styles.paragraph}>
        Oops! It seems like the page you're searching for is nowhere to be
        found.
      </p>
    </div>
  );
};

const styles = {
  container: {
    color: "#5dd4cc",
    textAlign: "center",
    padding: "100px",
    margin: "0",
  },
  heading: {
    color: "#e06f5d",
  },
  paragraph: {
    fontSize: "larger",
  },
};

export default NotFoundPage;
