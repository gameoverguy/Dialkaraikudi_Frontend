import BusinessDetails from "./Pages/BusinessDetail";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StarRating from "./Pages/Business_detail/ReviewStar";
import MainLayout from "./Components/MainLayout";

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
