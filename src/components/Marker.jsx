import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function Marker({ latLng }) {
  const [marker, setMarker] = useState();
  console.log(marker);

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  //   useEffect(() => {
  //     if (marker) {
  //       marker.setOptions(options);
  //     }
  //   }, [marker, latLng]);

  return null;
}

Marker.propTypes = {
  latLng: PropTypes.object,
};
