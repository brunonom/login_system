import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from 'react-toastify';

function Signup() {
  const { register, handleSubmit, watch, errors } = useForm();
  const postCreateUser = (data) => {
    axios({
        method: 'post',
        url: "http://127.0.0.1:5000/api/users/",
        data: data,
        responseType: 'text',
        headers: { "Access-Control-Allow-Origin": "*", 'Content-Type': 'application/json; charset=utf-8' }
      })
      .then((result) => {
        if (result.status === 200) {
          toast.success("Usuário criado com sucesso!");
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
          ref={register({ required: true })}
          name='phone_number'
          placeholder='Telefone'
        />
        {errors.username && <span>O campo username é necessário</span>}
        <input
          ref={register({ required: true, minLength: 6, maxLength: 20 })}
          name='password'
          type='password'
          placeholder='senha'
        />
        {errors.password && (
          <span>
            O campo senha é necessário, e precisa ter entre 6 e 20 caracters
          </span>
        )}
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
