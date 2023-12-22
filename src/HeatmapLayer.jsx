// HeatmapLayer.jsx
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet.heat';

const HeatmapLayer = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Extract lat, lng, and intensity values from points
    const data = points.map(({ lat, lng, intensity }) => [lat, lng, intensity]);

    // Create and add the heatmap layer to the map
    L.heatLayer(data, { radius: 25, blur: 15, maxZoom: 17 }).addTo(map);

    // Cleanup when the component is unmounted
    return () => {
      map.eachLayer((layer) => {
        if (layer instanceof L.HeatLayer) {
          map.removeLayer(layer);
        }
      });
    };
  }, [map, points]);

  return null;
};

export default HeatmapLayer;
