import React from 'react';

import { useDispatch, useSelector  } from 'react-redux';

import { AdminPanelHeader } from '../../../components/AdminPanelComponents/AminPanelHeader/AminPanelHeader';
import { AdminPanelProducts } from '../../../components/AdminPanelComponents/AdminPanelProducts/AdminPanelProducts';
import { AdminPanelFooter } from '../../../components/AdminPanelComponents/AdminPanelFooter/AdminPanelFooter';
import { AdminPanelForm } from '../../../components/AdminPanelComponents/AdminPanelFormLogin/AdminPanelFormLogin';

import { selectIsAuth, fetchAuth } from '../../../redux/slices/authSlice';

import { Container } from '../../../components';

import styles from './AdminPanel.module.scss';

export const AdminPanel = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) return alert('Не удалось авторизоваться!');
    if ('token' in data.payload) window.localStorage.setItem('token', data.payload.token);
  };

  return (
    <>
      {
        Boolean(isAuth.data) ? (
          <>
            <AdminPanelHeader />
            <AdminPanelProducts />
          </>
        ) : (
          <AdminPanelForm submit={onSubmit} status={isAuth.status}/>
        )
      }
    </>
  );
};

