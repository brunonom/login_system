import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/auth";

function Login(props) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const { register, handleSubmit } = useForm();
  const { setAuthTokens } = useAuth();
  const referer = props.location.state.referer.pathname || "/";

  const getLogin = (data) => {
    axios({
      method: "get",
      url: "http://127.0.0.1:5000/api/token",
      responseType: 'text',
      auth: {
        username: data.username,
        password: data.password
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json; charset=utf-8"
      }
    })
      .then((result) => {
        if (result.status === 200) {
          setAuthTokens(result.data);
          setLoggedIn(true);
        } else {
          setIsError(true);
        }
      })
      .catch((e) => {
        setIsError(true);
      });
  }

  if (isLoggedIn) {
    return <Redirect to={referer} />;
  }

  return (
    <main>
      <img src='../img/logo.jpeg' alt='logo' />
      <form
        className='pure-form pure-form-stacked'
        onSubmit={handleSubmit(getLogin)}>
        <input
          ref={register({ required: true })}
          name='username'
          placeholder='Nome de usuário'
        />
        <input
          ref={register({ required: true })}
          name='password'
          type='password'
          placeholder='Senha'
        />
        <button type='submit' className='pure-button'>
          Entrar
        </button>
      </form>
      <Link to='/signup'>Não tem conta?</Link>
      {isError && <p>O email ou senha está incorreto!</p>}
    </main>
  );
}

export default Login;
