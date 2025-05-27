import { useState } from 'react';
import axios from 'axios';

function App() {
  const [apiResponse, setApiResponse] = useState("");
  const [crops, setCrops] = useState("Tomato");

  const callAPI = async (endpoint) => {
    try {
      const res = await axios.post(endpoint, { crops });
      setApiResponse(JSON.stringify(res.data, null, 2));
    } catch (err) {
      console.error(err);
      setApiResponse("❌ Error calling API");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Agri Assistant</h1>
      <input value={crops} onChange={(e) => setCrops(e.target.value)} />
      <div style={{ marginTop: 10 }}>
        <button onClick={() => callAPI('/api1/analyze-text')}>Call API 1</button>
        <button onClick={() => callAPI('/api2/analyze-text')}>Call API 2</button>
        <button onClick={() => callAPI('/api3/analyze-text')}>Call API 3</button>
      </div>
      <pre style={{ marginTop: 20, background: "#222", color: "#0f0", padding: 10 }}>{apiResponse}</pre>
    </div>
  );
}

export default App;
