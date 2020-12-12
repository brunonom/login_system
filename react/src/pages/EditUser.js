import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from 'react-toastify';
import { useAuth } from "../context/auth";

function EditUser() {
  const { authTokens, setAuthTokens } = useAuth();
  const { register, handleSubmit, watch, errors, setValue } = useForm();

  const onSubmit = data => {
    console.log(data)
  };
  
  useEffect(() => {
    axios({
      method: 'get',
      url: "http://127.0.0.1:5000/api/users/1",
      responseType: 'text',
      auth: {
        username: authTokens,
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
          ref={register({ required: true })}
          name='username'
          placeholder='Nome de Usuário'
        />
        {errors.username && <span>O campo username é necessário</span>}
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
        {errors.email && <p className="error">{errors.email.message}</p>}
      </form>
    </main>
  );
}

export default EditUser;
