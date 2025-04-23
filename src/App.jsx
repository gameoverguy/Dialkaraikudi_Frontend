import BusinessDetails from "./Pages/BusinessDetail";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./Components/MainLayout";
import ContactDetail from "./Pages/ContactDetail";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/detail" element={<BusinessDetails />}/>
            <Route path="/contactdetail" element={<ContactDetail />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
