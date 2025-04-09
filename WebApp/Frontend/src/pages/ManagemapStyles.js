export const styles = {
  container: {
    display: "flex",
    height: '100vh',
  },
  sidebar: {
    height: "100vh",
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    border: '1px solid transparent',
    width: '80%', // Use percentage for width
    maxWidth: '300px', // Set a maximum width
    height: '35px',
    padding: '0 12px',
    borderRadius: '17px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
    backgroundColor: '#fff',
    position: 'absolute',
    right: '15%', // Adjusted for smaller screens
    top: '2%',
  },
  searchIcon: {
    marginRight: '8px',
    fontSize: '20px',
    color: '#757575',
  },
  searchBox: {
    width: '80%', // Use percentage for width
    border: 'none',
    outline: 'none',
    fontSize: '14px',
  },
  avatar: {
    backgroundColor: '#87d068',
    position: 'absolute',
    right: '0.5%',
    top: '2.5%',
  },

  '@media (max-width: 1024px)': {
    sidebar: {
      width: '300px',
    },
    searchContainer: {
      width: '85%',
      right: '10%',
    },
  },
  '@media (max-width: 768px)': {
    sidebar: {
      width: '200px',
    },
    searchContainer: {
      width: '90%',
      right: '5%',
      top: '4%',
    },
  },
  '@media (max-width: 480px)': {
    sidebar: {
      width: '180px',
    },
    searchContainer: {
      width: '100%',
      maxWidth: 'none',
      right: '2%',
      top: '4%',
      padding: '0 8px',
    },
  },
  '@media (max-width: 320px)': {
    sidebar: {
      width: '150px',
    },
    searchContainer: {
      width: '100%',
      maxWidth: 'none',
      right: '2%',
      top: '4%',
      padding: '0 5px',
    },
  },

  toolbox: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "5px",
    height: "100vh",
  },
  toolTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "-5px",
    color: "#000",
  },
  toolHr: {
    width: "120%",
    marginLeft: "-15px",
  },
  toolButton: {
    display: "flex",
    alignItems: "center",
    margin: "5px",
    padding: "5px 10px",
    fontSize: "12px",
    borderRadius: "11px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    cursor: "pointer",
    gap: "5px",
    width:"110px"
  },
  toolButtonHover: {
    backgroundColor: "#f0f0f0",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "auto",
  },
  saveButton: {
    padding: "5px 10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "#fff",
    cursor: "pointer",
  },
  cancelButton: {
    marginTop: "6px",
    padding: "5px 10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#f44336",
    color: "#fff",
    cursor: "pointer",
  },
  labelPopup: {
    position: "absolute",
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    zIndex: 2000,
    userSelect: "none",
    cursor: "move",
  },
  labelInput: {
    width: "100%",
    marginBottom: "5px",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
    fontSize: "14px",
  },
  labelButton: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
  },
  closeButton: {
    position: "absolute",
    top: "-5px",
    right: "-2px",
    background: "none",
    border: "none",
    cursor: "pointer",
    outline: "none",
  },

  label: {
    background: 'white',
    border: '1px solid #ccc',
    padding: '5px',
    borderRadius: '3px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
    fontSize: '12px',
    fontWeight: 'bold',
  },
};

export const containerStyle = {
  width: '100%',
  height: '100vh',
};

export const center = {
  lat: 6.2667,
  lng: 80.0333,
};
  