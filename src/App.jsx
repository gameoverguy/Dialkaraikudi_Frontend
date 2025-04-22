import BusinessDetails from "./Pages/BusinessDetail";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./Components/MainLayout";
import StarRating from "./Pages/BusinessDetail/ReviewStar";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<StarRating />} />
            <Route path="/detail" element={<BusinessDetails />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
