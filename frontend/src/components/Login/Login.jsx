import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import '../Register/Register.css';
import logoImg from '../../images/logo.svg';

const Login = ({ onLogin, loginErr }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'onBlur' });

  const onSubmit = (data) => {
    const lowerCaseEmail = data.email.toLowerCase();

    const processedData = {
      ...data,
      email: lowerCaseEmail,
    };

    onLogin(processedData);
  };

  return (
    <section className='auth'>
      <Link className='auth__img' to='/'>
        <img src={logoImg} alt='лого' />
      </Link>
      <h1 className='auth__heading'>Рады видеть!</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='auth__form'
        action='submit'
      >
        <label className='auth__label'>E-mail</label>
        <input
          {...register('email', {
            required: { value: true, message: 'Это поле нужно заполнить' },
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Пожалуйста, укажите корректный электронный адрес',
            },
          })}
          className='auth__input'
          type='email'
        />
        <span className='auth__input-error'>{errors?.email?.message}</span>
        <label className='auth__label'>Пароль </label>
        <input
          {...register('password', {
            required: 'Это поле нужно заполнить',
            minLength: {
              value: 6,
              message: 'Пароль должен состоять как минимум из 6 символов',
            },
          })}
          className={`auth__input ${
            errors?.password?.message.length > 0 ? 'auth__input_warning' : ''
          }`}
          type='password'
        />
        <span className='auth__input-error'>{errors?.password?.message}</span>
        <span className='auth__err-message'>{loginErr}</span>
        <button
          disabled={!isValid}
          className={`auth__submit-btn ${
            !isValid ? 'auth__submit-btn_disabled' : ''
          }`}
          type='submit'
        >
          Войти
        </button>
      </form>
      <div className='auth__redirect'>
        <p className='auth__redirect-text'>Ещё не зарегистрированы?</p>
        <Link to='/signup' className='auth__redirect-btn'>
          Регистрация
        </Link>
      </div>
    </section>
  );
};

export default Login;
