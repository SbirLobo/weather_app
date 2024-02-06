import "./App.css";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import MyMapComponent from "./components/MyMapComponent";

function App() {
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

  return (
    <>
      <p className="text-3xl font-bold underline">Hello world!</p>

      <Wrapper apiKey={VITE_GOOGLE_API_KEY} render={render}>
        <MyMapComponent />
      </Wrapper>
    </>
  );
}

export default App;
