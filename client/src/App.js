import React, { useState, useEffect } from "react";
import TopNav from "./components/TopNav";
import UserListView from "./components/UserListView";
import RegistrationForm from "./components/Registration/RegistrationForm";
import "./App.css";
import ChooseEvents from "./components/ChooseEvents";
import FormInput from "./components/FormInput";
import Local from "./helpers/Local";
import ClientAPI from "./helpers/ClientAPI";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";

//<RegistrationForm />
//<ChooseEvents />
//<UserListView />
function App() {
  let [user, setUser] = useState(Local.getUser());
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  const [registrationErrorMsg, setRegistrationErrorMsg] = useState("");
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] =
    useState(false);

  // const navigate = useNavigate();

  async function doRegister(username, email, password) {
    let myresponse = await ClientAPI.registerUser(username, email, password);
    if (myresponse.ok) {
      doLogin(username, password);
      setRegistrationErrorMsg("");
      setIsRegistrationSuccessful(myresponse);
    } else {
      setRegistrationErrorMsg(`Registration Failed`);
    }
  }

  async function doLogin(username, password) {
    let myresponse = await ClientAPI.loginUser(username, password);
    console.log(myresponse);
    if (myresponse.ok) {
      Local.saveUserInfo(myresponse.data.token, myresponse.data.user);
      setUser(myresponse.data.user);
      setLoginErrorMsg("");
      // navigate("/");
      console.log(`hello`);
    } else {
      setLoginErrorMsg("Login failed");
    }
  }

  function doLogout() {
    Local.removeUserInfo();
    setUser(null);
    // (NavBar will send user to home page)
  }

  return (
    <>
      <TopNav user={user} logOutCb={doLogout} />
      <main>
        {/* <RegistrationForm /> */}
        <LoginForm registrationMessage={isRegistrationSuccessful} />
        {/* <ChooseEvents /> */}
      </main>
    </>
  );
}

export default App;
