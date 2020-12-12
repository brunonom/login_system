import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from 'react-toastify';

function Signup() {
  const { register, handleSubmit, watch, errors } = useForm();
  let history = useHistory();
  const postCreateUser = (data) => {
    axios({
        method: 'post',
        url: "http://127.0.0.1:5000/api/users",
        data: data,
        responseType: 'text',
        headers: { "Access-Control-Allow-Origin": "*", 'Content-Type': 'application/json; charset=utf-8' }
      })
      .then((result) => {
        if (result.status === 201) {
          toast.success("Usuário criado com sucesso!");
          history.push("/");
        } else {
          toast.error("Houve uma falha na criação!");
        }
      })
      .catch((e) => {
        toast.error("Houve uma falha na criação!");
      });
  };

  return (
    <main>
      <img src='../img/logo.jpeg' alt='logo' />
      <form
        className='pure-form pure-form-stacked'
        onSubmit={handleSubmit(postCreateUser)}>
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
        <input
          ref={
            register({
              required: 'O campo senha é obrigatório',
              minLength : {
                value: 8,
                message: 'o campo senha precisa ter pelo menos 6 caracteres ' // JS only: <p>error message</p> TS only support string
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: 'Sua senha é fraca, ela precisa de pelo menos  de oito caracteres, pelo menos uma letra e um número' // JS only: <p>error message</p> TS only support string
              }
            })
          }
          name='password'
          type='password'
          placeholder='senha'
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
        <input
          ref={register({ validate: (value) => value === watch("password") })}
          name='password_confirmation'
          type='password'
          placeholder='repita a senha'
        />
        {errors.password_confirmation && (
          <span>As senhas precisam ser iguais</span>
        )}
        <div>
          <button type='submit' className='pure-button'>
            Cadastrar
          </button>
          <Link to='/login'>Já tem conta?</Link>
        </div>
      </form>
    </main>
  );
}

export default Signup;
