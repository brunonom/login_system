import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import FirstPhase from "../components/form/FirstPhase";
import SecondPhase from "../components/form/SecondPhase";

function Login(props) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [firstPhaseToken, setFirstPhaseToken] = useState();
  const referer = props.location.state.referer.pathname || "/";

  if (isLoggedIn) {
    return <Redirect to={referer} />;
  }

  return (
    <main>
      <img src='../img/logo.jpeg' alt='logo' />
      {!firstPhaseToken ? (
        <FirstPhase setFirstPhaseToken={setFirstPhaseToken} />
      ) : (
        <SecondPhase setLoggedIn={setLoggedIn} firstPhaseToken={firstPhaseToken} />
      )}
      <Link to='/signup'>Não tem conta?</Link>
    </main>
  );
}

export default Login;
