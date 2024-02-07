import "./App.css";
import { useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import MyMapComponent from "./components/MyMapComponent";
import WeatherInfos from "./components/WeatherInfos";
import Marker from "./components/Marker";

function App() {
  const [latLng, setLatLng] = useState();
  const [lat, setLat] = useState(44.83741010727143);
  const [lng, setLng] = useState(-0.5791063934285434);

  const VITE_GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

  const render = (status) => {
    switch (status) {
      case Status.LOADING:
        return <p>Loading...</p>;
      case Status.FAILURE:
        return <p>Fatal error !</p>;
      case Status.SUCCESS:
        return <MyMapComponent />;
    }
  };
  if (latLng) {
    console.log(latLng);
    console.log(JSON.stringify(latLng.toJSON(), null, 2));
  }

  return (
    <>
      <main className="flex flex-col gap-8">
        <p className="text-3xl font-bold underline">Weather app</p>

        <Wrapper apiKey={VITE_GOOGLE_API_KEY} render={render}>
          <MyMapComponent setLatLng={setLatLng} setLat={setLat} setLng={setLng}>
            <Marker position={latLng} latLng={latLng} />
          </MyMapComponent>
        </Wrapper>

        <WeatherInfos lat={lat} lng={lng} />
      </main>
    </>
  );
}

export default App;
