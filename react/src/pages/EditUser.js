import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from 'react-toastify';
import { useAuth } from "../context/auth";

function EditUser() {
  const [ loading, setLoading ] = useState()
  const { authTokens } = useAuth();
  const { register, handleSubmit, errors, setValue } = useForm();

  const onSubmit = data => {
    setLoading(true)
    axios({
      method: 'post',
      url: `http://127.0.0.1:5000/api/users/${authTokens().id}`,
      responseType: 'text',
      data: data,
      auth: {
        username: authTokens().token,
        password: 'no-needed',
      },
      headers: { "Access-Control-Allow-Origin": "*", 'Content-Type': 'application/json; charset=utf-8' }
    })
    .then((result) => {
      if (result.status === 200) {
        toast.error("Certinho. Tá atualizado!");
        setLoading();
      } else {
        toast.error("ixe, não vai dar não!");
        setLoading();
      }
    })
    .catch((e) => {
      setLoading();
      toast.error("ixe, não vai dar não!");
    });
  };
  
  useEffect(() => {
    axios({
      method: 'get',
      url: `http://127.0.0.1:5000/api/users/${authTokens().id}`,
      responseType: 'text',
      auth: {
        username: authTokens().token,
        password: 'no-needed',
      },
      headers: { "Access-Control-Allow-Origin": "*", 'Content-Type': 'application/json; charset=utf-8' }
    })
    .then((result) => {
      if (result.status === 200) {
        setValue("username", result.data.username)
        setValue("email", result.data.email)
      } else {
        toast.error("Houve uma falha pra mostrar");
      }
    })
    .catch((e) => {
      toast.error("Houve uma falha na obtenção!");
    });
  }, [authTokens, setValue])

  return (
    <main>
      <form
        className='pure-form pure-form-stacked'
        onSubmit={handleSubmit(onSubmit)}>
        <input
          ref={register({
            required: "Digite o e-mail",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Informe um e-mail válido",
            },
          })}
          name='email'
          placeholder='Email'
        />
        {errors.email && <p className='error'>{errors.email.message}</p>}
        <div>
          <button type='submit' disabled={loading === true} className='pure-button'>
            { loading === true ? 'calma, atualizando!' : 'Atualizar'}
          </button>
        </div>
      </form>
    </main>
  );
}

export default EditUser;
