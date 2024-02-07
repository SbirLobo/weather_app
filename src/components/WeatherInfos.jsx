import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";

export default function WeatherInfos({ lat, lng }) {
  const APIKEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const [datas, setDatas] = useState();

  useEffect(() => {
    if (lat) {
      const API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${APIKEY}&lang=fr&units=metric`;

      axios
        .get(API)
        .then((response) => {
          setDatas(response.data);
        })
        .catch((error) => console.error(error));
    }
  }, [APIKEY, lat, lng]);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-row gap-4">
          {datas && (
            <>
              <p className="text-blue-400">Place :</p>
              <p>
                {datas.name} ({datas.sys.country})
              </p>
            </>
          )}
        </div>
        <div className="flex flex-row gap-4">
          {datas && (
            <>
              <p className="text-blue-400">Weather :</p>
              <p> {datas.weather[0].description}</p>
            </>
          )}
        </div>
        {datas && (
          <img
            className="w-24"
            src={`https://openweathermap.org/img/wn/${datas.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
        )}
      </div>
    </>
  );
}

WeatherInfos.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
};
