import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MapView from './components/MapView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:templateId" element={<MapView />} />
      </Routes>
    </Router>
  );
}

export default App;
