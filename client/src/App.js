import React, { useState } from "react";
import TopNav from "./components/TopNav";
import UserListView from "./components/UserListView";
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import RegistrationForm from "./components/Registration/RegistrationForm";
import "./App.css";
import ChooseEvents from "./components/ChooseEvents";
import Local from "./helpers/Local";
import ClientAPI from "./helpers/ClientAPI";
import LoginForm from "./components/LoginForm";
import UserDashboard from "./components/UserDashboardView";
import SearchEvents from "./components/SearchEvents";
import Chat from "./components/Chat";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  let [user, setUser] = useState(Local.getUser());
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  const [registrationErrorMsg, setRegistrationErrorMsg] = useState("");
  const [userid, setUserid] = useState(false);

  const navigate = useNavigate();

  async function doRegister(username, email, password) {
    let myresponse = await ClientAPI.registerUser(username, email, password);

    if (myresponse.ok) {
      console.log("doreg data----", myresponse.data);
      Local.saveUserInfo(myresponse.data.token, myresponse.data.user);
      setRegistrationErrorMsg("");
      if (myresponse.data.userId !== null) {
        navigate("/register-two");
      }
    } else {
      console.log(myresponse);
      setRegistrationErrorMsg(`Registration Failed`);
    }
  }

  async function doLogin(username, password) {
    let myresponse = await ClientAPI.loginUser(username, password);
    if (myresponse.ok) {
      Local.saveUserInfo(myresponse.data.token, myresponse.data.user);
      setUser(myresponse.data.user);
      setLoginErrorMsg("");
      // navigate("/");
    } else {
      setLoginErrorMsg("Login failed");
    }
  }

  function doLogout() {
    Local.removeUserInfo();
    setUser(null);
    navigate("/");
    // (NavBar will send user to home page)
  }

  return (
    <>
      <TopNav logOutCb={doLogout} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<LoginForm doRegister={doRegister} />}
          />

          <Route
            path="/matched"
            element={
              <ProtectedRoute>
                <UserListView />
              </ProtectedRoute>
            }
          />

          <Route
            path="/register"
            element={<LoginForm doRegister={doRegister} />}
          />

          <Route
            path="/register-two"
            element={
              <ProtectedRoute>
                <RegistrationForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <ChooseEvents />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/searchevents"
            element={
              <ProtectedRoute>
                <SearchEvents />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
