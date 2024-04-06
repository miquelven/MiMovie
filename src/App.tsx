import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import CarouselPopularMovie from "./components/Carousel";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <CarouselPopularMovie />
    </>
  );
}

export default App;
