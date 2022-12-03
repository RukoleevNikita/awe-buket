import React from 'react';

import { useParams } from 'react-router-dom';

import axios from '../../../axios';

import { Container } from '../../../components';

import { AdminPanelHeader } from '../../../components/AdminPanelComponents/AminPanelHeader/AminPanelHeader';

import styles from './AdminPanelProduct.module.scss';

export const AdminPanelProduct = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`/admin-panel/getproduct/${id}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении товара');
      });
  }, []);

  return (
    <>
      <AdminPanelHeader />
      {
        isLoading ? <h1>Loading</h1> : 
          <Container>
            <div className={styles.product}>
              <div className={styles.product__slider}></div>
              <div className={styles.product__information}>
                <div className={styles.product__information_title}>
                  {data.name}
                </div>
                <div className={styles.product__information_description}>
                  {data.description}
                </div>
                <div className={styles.product__information_price}>
                  {data.price}
                </div>
                <div className={styles.product__information_price}>
                  {data.viewsCount}
                </div>
              </div>
            </div>
          </Container>
      }
    </>
  );
};

