import { useEffect, useState, useRef } from "react";

const center = { lat: 0, lng: 0 };
const zoom = 2;

const onClick = (e) => {
  console.log(JSON.stringify(e.latLng.toJSON(), null, 2));
};

export default function GoogleMaps() {
  const ref = useRef();
  const [map, setMap] = useState();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, { center, zoom }));
    }
  }, [ref, map]);

  useEffect(() => {
    if (map) {
      if (onClick) {
        map.addListener("click", onClick);
      }
    }
  }, [map]);

  return <div ref={ref} style={{ width: "600px", height: "350px" }} />;
}
