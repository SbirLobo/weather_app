import {
  useEffect,
  useState,
  useRef,
  Children,
  isValidElement,
  cloneElement,
} from "react";
import PropTypes from "prop-types";

export default function MyMapComponent({
  children,
  setLatLng,
  setLat,
  setLng,
  map,
  setMap,
}) {
  const ref = useRef();
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [newLatLng, setNewLatLng] = useState({ lat: 0, lng: 0 });
  const [zoom, setZoom] = useState(2);

  const onIdle = (m) => {
    setZoom(m.getZoom());
    setCenter(m.getCenter().toJSON());
  };

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, { center, zoom }));
    }
  }, [ref, map, center, zoom, setMap]);

  useEffect(() => {
    if (map) {
      map.setOptions({ newLatLng, zoom });
    }
  }, [map, newLatLng, zoom]);

  useEffect(() => {
    const onClick = (e) => {
      const latLngJSON = JSON.stringify(e.latLng.toJSON(), null, 2);
      setNewLatLng(latLngJSON);
      setLatLng(e.latLng);
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
      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, setLat, setLatLng, setLng]);

  return (
    <>
      <div ref={ref} style={{ width: "600px", height: "350px" }} />
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          // set the map prop on the child component
          // @ts-ignore
          return cloneElement(child, { map });
        }
      })}
    </>
  );
}

MyMapComponent.propTypes = {
  setLatLng: PropTypes.func,
  setLat: PropTypes.func,
  setLng: PropTypes.func,
  map: PropTypes.object,
  setMap: PropTypes.func,
  children: PropTypes.object,
};
