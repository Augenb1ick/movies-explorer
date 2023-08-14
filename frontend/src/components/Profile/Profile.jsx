import React, { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { useForm } from 'react-hook-form';
import './Profile.css';

const Profile = ({
  onUpdateProfile,
  onSignOut,
  profileMessage,
  profileErr,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
    getValues,
    watch,
  } = useForm({
    mode: 'onBlur',
  });

  const [isEdit, setIsEdit] = useState(false);
  const [isProfileChanged, setIsProfileChanged] = useState(false);

  useEffect(() => {
    setValue('name', currentUser.name);
    setValue('email', currentUser.email);
  }, [currentUser]);

  useEffect(() => {
    const name = watch('name');
    const email = watch('email');
    setIsProfileChanged(
      name !== currentUser.name || email !== currentUser.email
    );
  }, [watch('name'), watch('email')]);

  const onSubmit = (data) => onUpdateProfile(data);

  const editProfile = () => {
    setIsEdit(true);
  };

  const saveChanges = () => {
    onSubmit(getValues());
    setIsEdit(false);
  };

  return (
    <section className='profile'>
      <h2 className='profile__heading'>{`Привет, ${currentUser.name}!`}</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='profile__form'
        action='submit'
      >
        <label className='profile__label'>
          Имя
          <input
            disabled={!isEdit}
            {...register('name', {
              required: 'Это поле нужно заполнить',
              minLength: {
                value: 2,
                message: 'Имя должно состоять как минимум из 2 символов',
              },
            })}
            className='profile__input'
            type='text'
          />
        </label>
        <span className='profile__input-err'>{errors?.name?.message}</span>
        <label className='profile__label'>
          E-mail
          <input
            disabled={!isEdit}
            {...register('email', {
              required: { value: true, message: 'Это поле нужно заполнить' },
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Пожалуйста, укажите корректный электронный адрес',
              },
            })}
            className='profile__input'
            type='text'
          />
        </label>
        <span className='profile__input-err'>{errors?.email?.message}</span>
        <span className={`profile__message ${profileErr && 'profile__err'}`}>
          {profileMessage || profileErr}
        </span>
        {isEdit ? (
          <button
            type='submit'
            disabled={!isValid || !isProfileChanged}
            onClick={saveChanges}
            className={`profile__save-btn ${
              (!isValid || !isProfileChanged) && 'profile__save-btn_disabled'
            }`}
          >
            Сохранить
          </button>
        ) : (
          <>
            <button onClick={editProfile} className='profile__edit-btn'>
              Редактировать
            </button>
            <button onClick={onSignOut} className='profile__logout-btn'>
              Выйти из аккаунта
            </button>{' '}
          </>
        )}
      </form>
    </section>
  );
};

export default Profile;
