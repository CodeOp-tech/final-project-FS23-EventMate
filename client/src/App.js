import React, { useState, useEffect } from "react";
import TopNav from "./components/TopNav";
import UserListView from "./components/UserListView";
import RegistrationForm from "./components/Registration/RegistrationForm";

import "./App.css";
import ChooseEvents from "./components/ChooseEvents";

//<RegistrationForm />
//<ChooseEvents />
//<UserListView />
function App() {
  return (
    <>
      <TopNav />
      <main>
        <RegistrationForm />
        <ChooseEvents />
      </main>
    </>
  );
}

export default App;
