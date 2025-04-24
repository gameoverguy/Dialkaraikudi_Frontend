import { BrowserRouter, Route, Routes } from "react-router-dom";
import BusinessLogin from "./business/login.jsx";
import MainLayout from "./Components/MainLayout.jsx";
import BusinessDetailForm from "./business/BusinessDetailForm.jsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/detailform" element={<BusinessDetailForm />} />
            <Route path="/login" element={<BusinessLogin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
