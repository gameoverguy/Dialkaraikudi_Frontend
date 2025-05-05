import { BrowserRouter, Route, Routes } from "react-router-dom";
import Bussiness_List from "./Pages/Business_List";
import MainLayout from "./Components/MainLayout.jsx";
import BusinessDetails from "./Pages/BusinessDetail/index.jsx";
import HomePage from "./business/HomePage.jsx";
import AdminPanel from "./Pages/AdminPanel/index.jsx";
import { LoginModalProvider } from "./context/LoginContext.jsx";
import ReviewPage from "./Pages/ReviewPage/index.jsx";
import AdminLogin from "./Pages/AdminLogin/index.jsx";
import AdminRoute from "./Components/AdminRoute.jsx";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import NotFound from "./Components/NotFound.jsx";

// import BusinessLogin from "./business/login.jsx";
// import BusinessDetailForm from "./business/BusinessDetailForm.jsx";
// import BusinessTiming from "./Pages/BusinessTiming/index.jsx";
// import BusinessCategory from "./Pages/BusinessCategory/index.jsx";
// import ContactDetails from "./business/contact.jsx";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <>
      <LoginModalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/businesslist/:id" element={<Bussiness_List />} />
              <Route path="/businesslist" element={<Bussiness_List />} />
              <Route path="/business/:id" element={<BusinessDetails />} />
              <Route path="/review" element={<ReviewPage />} />
              {/* <Route path="/detailform" element={<BusinessDetailForm />} /> */}
              {/* <Route path="/login" element={<BusinessLogin />} /> */}
              {/* <Route path="/businesstiming" element={<BusinessTiming />} /> */}
              {/* <Route path="/businesscategory" element={<BusinessCategory />} /> */}
              {/* <Route path="/Contact" element={<ContactDetails />} /> */}
            </Route>
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/adminpanel" element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LoginModalProvider>
    </>
  );
}

export default App;
