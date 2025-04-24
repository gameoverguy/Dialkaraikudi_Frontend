import BusinessDetails from "./business/BusinessDetails";
import ContactDetails from "./business/contact";
import BusinessLogin from "./business/login";

function App() {
  return (
    <>
      <h1>Vite + React</h1>
      <BusinessLogin />
      <BusinessDetails/>
      <ContactDetails/>
    </>
  );
}

export default App;
