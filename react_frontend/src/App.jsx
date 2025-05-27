import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Polygon, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Обов'язково імпортуйте CSS Leaflet
import L from "leaflet"; // Імпортуємо Leaflet для виправлення іконок

// --- Виправлення для іконок Leaflet (обов'язково для Webpack/Create React App) ---
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});
// -------------------------------------------------------------------------------

function App() {
  // Назвемо головний компонент App
  const [polygons, setPolygons] = useState([]);
  const [points, setPoints] = useState([]);
  const [activePolygonId, setActivePolygonId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Функція для отримання полігонів
  const fetchPolygons = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://127.0.0.1/api/poligons/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPolygons(data.features);
    } catch (err) {
      console.error("Error fetching polygons:", err);
      setError("Не вдалося завантажити полігони.");
    } finally {
      setLoading(false);
    }
  };

  // Отримуємо полігони при першому рендері компонента
  useEffect(() => {
    fetchPolygons();
  }, []);

  // Функція для обробки кліку по полігону та отримання точок
  const handlePolygonClick = async (polygonId) => {
    if (activePolygonId === polygonId) {
      // Якщо клікнули на той самий полігон, прибираємо точки
      setPoints([]);
      setActivePolygonId(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://127.0.0.1/api/poligons/${polygonId}/points_inside/`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Ваш API повертає FeatureCollection для точок
      setPoints(data.features);
      setActivePolygonId(polygonId);
    } catch (err) {
      console.error(`Error fetching points for polygon ${polygonId}:`, err);
      setError("Не вдалося завантажити точки для цього полігону.");
      setPoints([]); // Очистити точки у разі помилки
      setActivePolygonId(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading && polygons.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        Завантаження карти та полігонів...
      </div>
    );
  }

  if (error && polygons.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
        Помилка: {error}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
      }}
    >
      <h1 style={{ textAlign: "center", margin: "10px 0", color: "#333" }}>
        Карта Об'єктів
      </h1>
      <MapContainer
        center={[49.0, 31.0]} // Центр України
        zoom={6}
        style={{ flexGrow: 1, height: "auto", width: "100%" }} // Карта займе весь доступний простір
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {polygons.map((polygonFeature) => {
          // Координати з GeoJSON зазвичай [довгота, широта], Leaflet очікує [широта, довгота]
          const coordinates = polygonFeature.geometry.coordinates[0].map(
            (coord) => [coord[1], coord[0]]
          );
          const isSelected = polygonFeature.id === activePolygonId;
          const polygonColor = isSelected ? "#007bff" : "#ff7800"; // Синій для вибраного, помаранчевий для інших

          return (
            <Polygon
              key={polygonFeature.id}
              positions={coordinates}
              pathOptions={{ color: polygonColor, weight: isSelected ? 4 : 2 }} // Товстіший контур для вибраного
              eventHandlers={{
                click: () => handlePolygonClick(polygonFeature.id),
              }}
            >
              {/* Можна додати спливаюче вікно з інформацією про полігон */}
              {/* <Popup>
                                <h3>{polygonFeature.properties.name}</h3>
                                <p>{polygonFeature.properties.description}</p>
                            </Popup> */}
            </Polygon>
          );
        })}

        {points.map((pointFeature) => {
          // Координати точки з GeoJSON [довгота, широта]
          const coordinates = pointFeature.geometry.coordinates;
          const position = [coordinates[1], coordinates[0]]; // Перетворюємо для Leaflet

          return (
            <Marker key={pointFeature.id} position={position}>
              {/* Можна додати спливаюче вікно з інформацією про точку */}
              {/* <Popup>
                                <h3>{pointFeature.properties.name}</h3>
                                <p>{pointFeature.properties.description}</p>
                            </Popup> */}
            </Marker>
          );
        })}
      </MapContainer>
      {loading && points.length === 0 && activePolygonId && (
        <div
          style={{
            textAlign: "center",
            padding: "10px",
            backgroundColor: "#e0e0e0",
          }}
        >
          Завантаження точок...
        </div>
      )}
      {error && points.length === 0 && activePolygonId && (
        <div
          style={{
            textAlign: "center",
            padding: "10px",
            color: "red",
            backgroundColor: "#ffe0e0",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}

export default App; // Експортуємо компонент для використання в index.js
