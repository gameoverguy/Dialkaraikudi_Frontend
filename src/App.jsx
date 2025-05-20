import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop.jsx";
import Bussiness_List from "./Pages/Business_List";
import MainLayout from "./Components/MainLayout.jsx";
import BusinessDetails from "./Pages/BusinessDetail/index.jsx";
import HomePage from "./Pages/Home/Index.jsx";
import AdminPanel from "./Pages/AdminPanel/index.jsx";
import { LoginModalProvider } from "./context/LoginContext.jsx";
import ReviewPage from "./Pages/ReviewPage/index.jsx";
import AdminLogin from "./Pages/AdminLogin/index.jsx";
import { AdminRoute, BusinessRoute } from "./Components/ProtectedRoutes.jsx";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import NotFound from "./Components/NotFound.jsx";
import BusinessDetailForm from "./business/BusinessDetailForm.jsx";
import BusinessTiming from "./Pages/BusinessTiming/index.jsx";
import BusinessCategory from "./Pages/BusinessCategory/index.jsx";
import ContactDetails from "./business/contact.jsx";
import AddToBusiness from "./Pages/VendorPanel/AddToBussiness.jsx";
import VendorDashboard from "./Pages/VendorPanel/Dashboard/index.jsx";
import VendorPanel from "./Pages/VendorPanel/Index.jsx";
import Favorites from "./Pages/Favorites/index.jsx";
import EditProfile from "./Pages/EditProfile/index.jsx";
import SlotAds from "./Pages/AdminPanel/Advertisment/SlotAds.jsx";

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
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />

              <Route path="/businesslist/:id" element={<Bussiness_List />} />
              <Route path="/businesslist" element={<Bussiness_List />} />
              <Route path="/business/:id" element={<BusinessDetails />} />
              <Route path="/review" element={<ReviewPage />} />
              <Route path="/1" element={<AddToBusiness />} />
              <Route path="/detailform" element={<BusinessDetailForm />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/profile" element={<EditProfile />} />
            </Route>
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route
              path="/adminpanel"
              element={
                <AdminRoute>
                  <AdminPanel />
                </AdminRoute>
              }
            />
            <Route
              path="/adminpanel/advertisement/slot/:slotId"
              element={<SlotAds />}
            />
            <Route
              path="/vendorpanel"
              element={
                <BusinessRoute>
                  <VendorPanel />
                </BusinessRoute>
              }
            />
            <Route
              path="/vendorpanel/:id"
              element={
                <BusinessRoute>
                  <VendorPanel />
                </BusinessRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LoginModalProvider>
    </>
  );
}

export default App;
