import React from 'react';

import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import  logo  from '../../../assets/images/logo.png';

import { logout } from '../../../redux/slices/authSlice';

import styles from './AdminPanelHeader.module.scss';

export const  AdminPanelHeader = () => {
  const dispatch = useDispatch();

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <Link to="/admin-panel">
          <img src={logo} className={styles.header__logo} alt="logo" />
        </Link>
        <Link to="/admin-panel/add-product">
          <button
            className={styles.form__btn}
            type="submit"
          >
          добавить товар
          </button>
        </Link>
        <button
          onClick={onClickLogout}
          className={styles.form__btn}
          type="submit"
        >
          выйти
        </button>
      </div>
    </header>
  );
};