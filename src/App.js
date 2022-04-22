import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
/* import { useEffect } from "react/cjs/react.production.min"; */

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const storedUserLoggedInfo = localStorage.getItem("isLoggeIn");

  useEffect(() => { //la funcion entre corchetes va a ser ejecutada cada vez que la dependencia en el segundo argumento sufra algun tipo de modificacion
    if (storedUserLoggedInfo === "1") {
      setIsLoggedIn(true);
    }
  }, []); // esta es la dependencia que cada vez que se detecte una modificacion, la funcion de arriba se ejecutara

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "1"); //estos valores se pueden verificar en el browser yendo a inspect elem/application/local storage
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
