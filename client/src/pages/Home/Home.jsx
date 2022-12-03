import React from 'react';

import { Container } from '../../components';
import  banner  from '../../assets/images/banner.jpg';

import styles from './Home.module.scss';

export const Home = () => {
    
  return (
    <>
      <div className={styles.banner}>
        <img src={banner} alt="" />
      </div>
      <Container>
        <main className={styles.main}>
       
          <div className={styles.main__ts}>
            MAIN CONTENT
          </div>
        </main>
      </Container></>
  );
};