import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './Register.css';
import logoImg from '../../images/logo.svg';

const Register = ({ onRegister, registerErr, isLoading }) => {
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

    onRegister(processedData);
  };

  return (
    <section className='auth'>
      <Link className='auth__img' to='/'>
        <img src={logoImg} alt='лого' />
      </Link>
      <h1 className='auth__heading'>Добро пожаловать!</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='auth__form'
        action='submit'
      >
        <label className='auth__label'>Имя</label>
        <input
          disabled={isLoading}
          {...register('name', {
            required: 'Это поле нужно заполнить',
            minLength: {
              value: 2,
              message: 'Имя должно состоять как минимум из 2 символов',
            },
          })}
          className='auth__input'
          type='text'
        />
        <span className='auth__input-error'>{errors?.name?.message}</span>
        <label className='auth__label'>E-mail</label>
        <input
          disabled={isLoading}
          {...register('email', {
            required: { value: true, message: 'Это поле нужно заполнить' },
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Пожалуйста, укажите корректный электронный адрес',
            },
          })}
          className='auth__input'
          type='text'
        />
        <span className='auth__input-error'>{errors?.email?.message}</span>
        <label className='auth__label'>Пароль </label>
        <input
          disabled={isLoading}
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
        <span className='auth__err-message'>{registerErr}</span>
        <button
          disabled={!isValid || isLoading}
          className={`auth__submit-btn ${
            !isValid || isLoading ? 'auth__submit-btn_disabled' : ''
          }`}
          type='submit'
        >
          {isLoading ? 'Регистрируем...' : 'Зарегистрироваться'}
        </button>
      </form>
      <div className='auth__redirect'>
        <p className='auth__redirect-text'>Уже зарегистрированы?</p>
        <Link to='/signin' className='auth__redirect-btn'>
          Войти
        </Link>
      </div>
    </section>
  );
};

export default Register;
