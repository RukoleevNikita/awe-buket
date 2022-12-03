import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fetchProducts, fetchProductsCat } from '../../redux/slices/productsSlice';

import { Container, ProductsCards } from '../../components/index';


import { Categories } from '../../components/Categories/Categories';

import { useSort } from '../../hooks/useSort';

import styles from './Collection.module.scss';

export const Collection = () => {
  const [activeIndex, setActiveIndex] = React.useState();
  const [category, setCategory] = React.useState();

  const dispatch = useDispatch();
  const { products }  = useSelector(state => state.products);

  const { sortedProduct, setIsSort } = useSort(products.items || []);
  
  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const eventHandler = (i, category) => {
    setCategory(category);
    setActiveIndex(i);
    setIsSort(category);

  };

  // add loading

  return (
    <main>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.category}>
            <nav>
              <Categories activeIndex={activeIndex} eventHandler={eventHandler} />
            </nav>
          </div>
          <div className={styles.products}>  
            {
              sortedProduct.length !== 0 ? sortedProduct.map((el) => <ProductsCards key={el._id} {...el} />) : products.items.length && products.items.map((el) => (
                <ProductsCards key={el._id} {...el} />
              ))
            }
          </div>
        </div>
      </Container>
    </main>
  );
};
