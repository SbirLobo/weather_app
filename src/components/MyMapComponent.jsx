import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

const center = { lat: 0, lng: 0 };
const zoom = 2;

export default function MyMapComponent({ setLat, setLng }) {
  const ref = useRef();
  const [map, setMap] = useState();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, { center, zoom }));
    }
  }, [ref, map]);

  useEffect(() => {
    const onClick = (e) => {
      const latLngJSON = JSON.stringify(e.latLng.toJSON(), null, 2);
      JSON.parse(latLngJSON, (key, value) => {
        if (key === "lat") {
          setLat(value);
        }
        if (key === "lng") {
          setLng(value);
        }
      });
    };
    if (map) {
      if (onClick) {
        map.addListener("click", onClick);
      }
    }
  }, [map, setLat, setLng]);

  return <div ref={ref} style={{ width: "600px", height: "350px" }} />;
}

MyMapComponent.propTypes = {
  setLatLng: PropTypes.func,
  setLat: PropTypes.func,
  setLng: PropTypes.func,
};
