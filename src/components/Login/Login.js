import React, { useState, useContext } from 'react';
import axios from 'axios';

import AuthContext from '../../context/AuthContext';
import './login.css';

const Login = () => {
  const authContext = useContext(AuthContext);

  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(null);
  const [errLogin, setErrLogin] = useState('');
  const [errPass, setErrPass] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    if (login.length < 8) {
      setErrLogin('Некорректный логин');
    } else if (pass.length < 8) {
      setErrPass('Некорректный пароль');
    } else {
      axios
        .post('https://emphasoft-test-assignment.herokuapp.com/api-token-auth/', {
          username: login,
          password: pass,
        })
        .then(({ data }) => {
          authContext.login(data.token);
        })
        .catch((e) => {
          setError('Проверьте корректность введенных полей');
        });
    }
  };

  const loginInputHandler = (e) => {
    const value = e.target.value.trim();
    setLogin(value);

    if (value.length < 8 && value.length > 1) {
      setErrLogin('Некорректный логин');
    } else {
      setErrLogin('');
    }
  };

  const passInputHandler = (e) => {
    const value = e.target.value.trim();
    setPass(value);

    if (value.length < 8 && value.length > 1) {
      setErrPass('Некорректный логин');
    } else {
      setErrPass('');
    }
  };

  return (
    <>
      <form className="login-form" onSubmit={submitForm}>
        <h2>Авторизация</h2>
        {error && <p>Проверьте корректность введенных полей</p>}

        <label htmlFor="login">Введите логин</label>
        <input
          id="login"
          className={`login-form_input ${!!errLogin ? 'error' : ''}`}
          type="text"
          name="username"
          placeholder=""
          value={login}
          onChange={loginInputHandler}
        />

        <label htmlFor="pass">Введите пароль</label>
        <input
          id="pass"
          className={`login-form_input ${!!errPass ? 'error' : ''}`}
          type="password"
          name="password"
          placeholder=""
          onChange={passInputHandler}
        />
        <button className="login-from_btn" onSubmit={submitForm} disabled={!!errLogin || !!errPass}>
          Войти
        </button>
      </form>
    </>
  );
};

export default Login;
