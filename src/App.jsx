import BusinessDetails from "./business/BusinessDetails";
import ContactDetails from "./business/contact";
import BusinessLogin from "./business/login";

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
