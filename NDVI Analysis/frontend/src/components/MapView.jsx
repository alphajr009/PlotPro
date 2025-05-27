import { MapContainer, TileLayer, Polygon, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

// 🔍 Component to zoom into polygon
const ZoomToPolygon = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    if (points.length > 0) {
      const bounds = points.map(p => [p.latitude, p.longitude]);
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [points, map]);

  return null;
};

function MapView() {
  const { templateId } = useParams();
  const [locationPoints, setLocationPoints] = useState([]);
  const [tileUrl, setTileUrl] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: dayjs().subtract(45, 'day'),
    endDate: dayjs().subtract(30, 'day'),
  });

  // Fetch template location points
  useEffect(() => {
    if (!templateId) return;

    const fetchTemplate = async () => {
      try {
        const res = await axios.get(`https://plot-pro.vercel.app/api/mapTemplateNDVI/getOneTemplate/${templateId}`);
        setLocationPoints(res.data.locationPoints);
      } catch (err) {
        console.error("❌ Failed to fetch template:", err);
      }
    };
    fetchTemplate();
  }, [templateId]);

  // Fetch NDVI tile based on polygon + date range
  useEffect(() => {
    if (locationPoints.length < 3) return;

    const fetchTile = async () => {
      try {
        const res = await axios.post('https://9871-52-157-243-73.ngrok-free.app/api/ndvi/tile-url', {
          locationPoints,
          startDate: dateRange.startDate.format('YYYY-MM-DD'),
          endDate: dateRange.endDate.format('YYYY-MM-DD'),
        });
        setTileUrl(res.data.tileUrl);
      } catch (error) {
        console.error("❌ Failed to fetch NDVI tile:", error);
      }
    };

    fetchTile();
  }, [locationPoints, dateRange]);

  // Shift the date range for NDVI
  const shiftDateRange = (direction) => {
    setDateRange(prev => {
      const delta = direction === 'backward' ? -14 : 14;
      return {
        startDate: prev.startDate.add(delta, 'day'),
        endDate: prev.endDate.add(delta, 'day'),
      };
    });
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {/* Date Range Controls */}
      <div style={{ padding: 10, textAlign: 'center' }}>
        <button onClick={() => shiftDateRange('backward')}>⬅️</button>
        <span style={{ margin: '0 15px' }}>
          {dateRange.startDate.format('DD/MM/YYYY')} - {dateRange.endDate.format('DD/MM/YYYY')}
        </span>
        <button onClick={() => shiftDateRange('forward')}>➡️</button>
      </div>

      {/* Map Container */}
      <MapContainer center={[7.425, 81.127]} zoom={17} style={{ height: 'calc(100% - 50px)', width: '100%' }}>
        {/* Base imagery layer */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles © Esri, Maxar, Earthstar Geographics"
        />

        {/* NDVI overlay if available */}
        {tileUrl && (
          <TileLayer
            url={tileUrl}
            opacity={0.85}
            zIndex={500}
          />
        )}

        {/* Polygon and zoom handler */}
        {locationPoints.length > 0 && (
          <>
            <Polygon
              positions={locationPoints.map(p => [p.latitude, p.longitude])}
              pathOptions={{
                color: 'white',
                weight: 2,
                fill: false,
              }}
            />
            <ZoomToPolygon points={locationPoints} />
          </>
        )}
      </MapContainer>
    </div>
  );
}

export default MapView;
