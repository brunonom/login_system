import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import { useAuth } from "../context/auth";

function Admin(props) {
  let history = useHistory();
  const [users, setUsers]= useState([])
  const { authTokens, setAuthTokens } = useAuth();

  useEffect(() => {
    axios({
      method: 'get',
      url: "http://127.0.0.1:5000/api/users",
      auth: {
        username: authTokens().token,
        password: 'no-needed',
      },
      responseType: 'text',
      headers: { "Access-Control-Allow-Origin": "*", 'Content-Type': 'application/json; charset=utf-8' }
    })
    .then((result) => {
      if (result.status === 200) {
        setUsers(result.data)
      } else if (result.status === 401) {
        toast.error("Você ainda é um jovem sem privilégios, nada pra você!");
      }
    })
    .catch((e) => {
      toast.error("Você ainda é um jovem sem privilégios, nada pra você!");
    });
  }, [authTokens])

  function logOut() {
    setAuthTokens();
    history.push("/");
  }

  return (
    <main>
      <div>Este conteúdo é protegido por nível de acesso</div>
      <table class="pure-table">
        <thead>
            <tr>
              <th>Editar</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.location}>
              <td>{user.location}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="pure-button logout-btn" onClick={logOut}>Sair</button>
    </main>
  );
}

export default Admin;
