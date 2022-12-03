import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SpinnerDotted } from 'spinners-react'; // https://github.com/adexin/spinners-react

import { ProductsCards } from '../AdminPanelProductsCards/AdminPanelProductsCards';


import axios from '../../../axios';  
import { fetchProductsAdmin } from '../../../redux/slices/productsSlice';

import { Container } from '../../Container/Container';

import styles from './Products.module.scss';

export const AdminPanelProducts = () => {
  const dispatch = useDispatch();
  const { products }  = useSelector(state => state.products);
  // add isLoding
  const isProductLoading = products.status === 'loading';

  React.useEffect( () => {
    dispatch(fetchProductsAdmin('asd'));
  }, [dispatch]);

  return (
    <main>
      <Container>
        <h1 style={{'textAlign': 'center'}}>Main block products</h1>
        <div className={styles.product}>
          {/* проверить есть ли товары в БД */}
          {products.items.length && products.items.map((el) => (
            <ProductsCards key={el._id} {...el} />
          ))}
        </div>
      </Container>
    </main>
  );
};
