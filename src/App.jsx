import { BrowserRouter, Route, Routes } from "react-router-dom";
import Bussiness_List from "./Pages/Business_List";
import BusinessLogin from "./business/login.jsx";
import MainLayout from "./Components/MainLayout.jsx";
import BusinessDetailForm from "./business/BusinessDetailForm.jsx";
import BusinessDetails from "./Pages/BusinessDetail/index.jsx";
import BusinessTiming from "./Pages/BusinessTiming/index.jsx";
import BusinessCategory from "./Pages/BusinessCategory/index.jsx";
import ContactDetails from "./business/contact.jsx";
import AdminLogin from "./Pages/AdminLogin/index.jsx";
import HomePage from "./business/HomePage.jsx";
import ForgotPassword from "./Pages/AdminLogin/ForgotPassword/index.jsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/list" element={<Bussiness_List />} />
            <Route path="/detailform" element={<BusinessDetailForm />} />
            <Route path="/login" element={<BusinessLogin />} />
            <Route path="/businessdetails" element={<BusinessDetails />} />
            <Route path="/businesstiming" element={<BusinessTiming />} />
            <Route path="/businesscategory" element={<BusinessCategory />} />
            <Route path="/Contact" element={<ContactDetails />} />
            <Route path="/home" element={<HomePage />} />
          </Route>
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
