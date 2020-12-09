import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/auth";

function SecondPhase({ setLoggedIn, firstPhaseToken }) {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const { setAuthTokens } = useAuth();

  const getSecondPhase = (data) => {
    setIsLoading(true);
    axios({
      method: "get",
      url: "http://127.0.0.1:5000/api/auth/token",
      responseType: "text",
      auth: {
        username: firstPhaseToken,
        password: data.password,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((result) => {
        if (result.status === 200) {
          setAuthTokens(result.data);
          setLoggedIn(true);
        } else {
          setIsError(true);
        }
        setIsLoading(false);
      })
      .catch((e) => {
        setIsError(true);
        setIsLoading(false);
      });
  };
  return (
    <>
      <p>Digite o token enviado para o seu email:</p>
      <form
        className='pure-form pure-form-stacked'
        onSubmit={handleSubmit(getSecondPhase)}>
        <input
          ref={register({ required: true })}
          name='password'
          placeholder='E-mail token'
        />
        {isLoading ? (
          <p>Aguarde...</p>
        ) : (
          <button type='submit' className='pure-button'>
            Entrar
          </button>
        )}
        {isError && <p>Dados incorretos</p>}
      </form>
    </>
  );
}

export default SecondPhase;
