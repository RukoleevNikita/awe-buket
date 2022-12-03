import React from 'react';

import { Outlet } from 'react-router-dom';

import { Header, Footer } from '../index';


import styles from './Layout.module.scss';


export const Layout = () => {
    
  return (
    <>
      <Header />
      <Outlet />
  
      <Footer />
    </>
  );
};



