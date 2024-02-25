import "./App.css";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login/login";
import "bootstrap/dist/css/bootstrap.min.css"
import UserRegistration from "./UserRegistration/UserRegistration";

function App() {
  return (
    <div className="App">
      <UserRegistration />
    </div>
  );
}
export default App;