import React from 'react';

import { useSelector } from 'react-redux';

import { Container } from '../../components';

import styles from './Cart.module.scss';
import { CartItem } from './CartItem/CartItem';

export const Cart = () => {
  
  const { items, totalPrice, totalCount } = useSelector(state => state.cart );

  return (
    <Container>
      <div className={styles.cart}>
        <h1>Корзина</h1>
        {
          items.map((item) => <CartItem {...item} key={item.id} />)
        }
      </div>
      <div className={styles.cart__order}>
        Итого: <span>{totalPrice} ₽</span>
      </div>
    </Container>
  );
};
