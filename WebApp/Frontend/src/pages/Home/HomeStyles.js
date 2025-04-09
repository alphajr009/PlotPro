export const styles = {
  mapButton: {
    padding: "10px 15px",
    fontSize: "14px",
    color: "white",
    backgroundColor: "#1640D6",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    transition: "background-color 0.3s",
  },
  adminButton: {
    position: "fixed",
    right: "20px",
    top: "17px",
    padding: '10px 20px',
    cursor: 'pointer',
    zIndex: 1000,
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    transition: 'all 0.3s ease',
  },
  loadingOverlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
},

  gradientButton: {
    background: 'linear-gradient(45deg,#2a1b66,#2196F3,#21cbf3,#2a1b66)',
    backgroundSize: '200% auto',
    boxShadow: '0 4px 6px rgba(33, 150, 243, 0.3), 0 1px 3px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      backgroundPosition: 'right center',
      boxShadow: '0 6px 8px rgba(33, 150, 243, 0.4), 0 2px 4px rgba(0, 0, 0, 0.1)',
    },
  },
  completeButton: {
    position: "absolute",
    bottom: "200px", // This places it above the undo button
    left: "10px",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    zIndex: 1000,
  },
  undoButton: {
    position: "absolute",
    bottom: "150px",
    left: "10px",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    zIndex: 1000,
  },
  buttonContainer: {
    position: "absolute",
    bottom: "20px",
    left: "20px",
    right: "20px",
    display: "flex",
    justifyContent: "space-between",
    zIndex: 1000,
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
  },
  buttonGroupLeft: {
    marginLeft: "50px",
  },
  buttonGroupRight: {
    marginRight: "50px",
  },

  mapButtonTopLeft: {
    top: "80px",
    left: "10px",
  },
  mapButtonTopRight: {
    top: "80px",
    right: "10px",
  },
  mapButtonBottomLeft: {
    bottom: "30px",
    left: "10px",
  },
  mapButtonBottomRight: {
    bottom: "30px",
    right: "10px",
  },
  container: {
    display: "flex",
    height: "100vh",
  },
  sidebar: {
    height: "100vh",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    border: "1px solid transparent",
    width: "80%", // Use percentage for width
    maxWidth: "300px", // Set a maximum width
    height: "35px",
    padding: "0 12px",
    borderRadius: "17px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
    backgroundColor: "#fff",
    position: "absolute",
    right: "15%", // Adjusted for smaller screens
    top: "2%",
  },
  searchIcon: {
    marginRight: "8px",
    fontSize: "20px",
    color: "#757575",
  },
  searchBox: {
    width: "80%", // Use percentage for width
    border: "none",
    outline: "none",
    fontSize: "14px",
  },
  avatar: {
      cursor: 'pointer',
      position: 'absolute',
      right: '0.5%',
      top: '6.2%',
    },

  "@media (max-width: 1024px)": {
    sidebar: {
      width: "300px",
    },
    searchContainer: {
      width: "85%",
      right: "10%",
    },
  },
  "@media (max-width: 768px)": {
    sidebar: {
      width: "200px",
    },
    searchContainer: {
      width: "90%",
      right: "5%",
      top: "4%",
    },
    avatar: {
      cursor: "pointer",
      position: "absolute",
      right: "0.5%",
      top: "6.2%",
    },
    searchContainer: {
      width: "100%",
      maxWidth: "none",
      right: "2%",
      top: "4%",
      padding: "0 8px",
    },
  },
  "@media (max-width: 320px)": {
    sidebar: {
      width: "150px",
    },
    searchContainer: {
      width: "100%",
      maxWidth: "none",
      right: "2%",
      top: "4%",
      padding: "0 5px",
    },
  },
};

export const containerStyle = {
  width: "100%",
  height: "100vh",
};

export const center = {
  lat: 6.2667,
  lng: 80.0333,
};
