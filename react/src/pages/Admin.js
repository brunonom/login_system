import React from "react";
import { useAuth } from "../context/auth";

function Admin(props) {
  const { setAuthTokens } = useAuth();

  function logOut() {
    setAuthTokens();
  }

  return (
    <main>
      <div>Página Administrativa: este conteúdo é protegido</div>
      <button className="pure-button" onClick={logOut}>Sair</button>
    </main>
  );
}

export default Admin;
