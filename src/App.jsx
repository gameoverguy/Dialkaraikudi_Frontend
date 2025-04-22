import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./Components/MainLayout";
import Bussiness_List from "./Pages/Business_List";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/list" element={<Bussiness_List />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
