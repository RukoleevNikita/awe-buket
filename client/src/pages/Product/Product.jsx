import React from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import axios from '../../axios';
import {addItem} from '../../redux/slices/cartSlice';

import { Container } from '../../components';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';
import { Slider } from '../../components/Slider/Slider';
import { Button } from '../../components/UI/Button/Button';

import styles from './Product.module.scss';

export const Product = () => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);

  const { id } = useParams();

  React.useEffect(() => {
    if (id) {
      axios
        .get(`/getproduct/${id}`)
        .then((res) => {
          setData(res.data);
          setLoading(false);
          window.scrollTo(0, 0);
        })
        .catch((err) => {
          console.warn(err);
          alert('Ошибка при получении товара');
        });
    }
  }, []);

  function addProduct() {
    const item = {
      id: data._id,
      name: data.name,
      price: Number(data.price),
      previewUrl: data.previewUrl
    };
    dispatch(addItem(item));
  }
    
  return (
    <>
      {
        isLoading ? <h1>Loading</h1> : 
          <Container>
            <div className={styles.product}>
              <div className={styles.product__slider}>
                <Slider {...data.mainPhotosUrl} />
              </div>
              <div className={styles.product__information}>
                <div className={styles.product__information_title}>
                  {data.name}
                </div>
                <div className={styles.product__information_description}>
                  <span>Состав: </span>{data.description}
                </div>
                <div className={styles.product__information_price}>
                  {data.price} ₽
                </div>
                <div className={styles.product__information_control}>
                  <Button onClick={addProduct}>Добавить в корзину</Button>
                </div>
              </div>
            </div>
          </Container>
      }
    </>
  );
};

