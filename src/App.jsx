import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Business_Det from "./Pages/Business_detail";
import StarRating from "./Pages/Business_detail/ReviewStar";
import MainLayout from "./Components/MainLayout";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<StarRating />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
