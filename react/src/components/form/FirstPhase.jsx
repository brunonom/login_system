import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

function FirstPhase({ setFirstPhaseToken }) {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const getFirstPhase = (data) => {
    setIsLoading(true);
    axios({
      method: "get",
      url: "http://127.0.0.1:5000/api/auth/phase1",
      responseType: "text",
      auth: {
        username: data.username,
        password: data.password,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((result) => {
        if (result.status === 200) {
          setFirstPhaseToken(result.data.token);
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
    <form
      className='pure-form pure-form-stacked'
      onSubmit={handleSubmit(getFirstPhase)}>
      <input
        ref={register({ required: true })}
        name='username'
        placeholder='E-mail'
      />
      <input
        ref={register({ required: true })}
        name='password'
        type='password'
        placeholder='Senha'
      />
      {isLoading ? (
        <p>Aguarde...</p>
      ) : (
        <button type='submit' className='pure-button'>
          Entrar
        </button>
      )}
      {isError && <p>O email ou senha está incorreto!</p>}
    </form>
  );
}

export default FirstPhase;
