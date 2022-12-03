import React from 'react';
import { Link } from 'react-router-dom';

import styles from './LoadImg.module.scss';

export const ProductCard = ({
  _id = '',
  description = '',
  imageUrl = [],
  name = '',
  price = 0,
  viewsCount = 0, 
  onload
}) => {

  return (
    <div className={styles.product__card_wrapper}>
      <Link to={`/admin-panel/getproduct/${_id}`}>
    
        <div
          style={{'backgroundImage': `url(${imageUrl[0]})`, 'backgroundSize': 'cover', 'paddingTop': '133%', 'borderRadius': '30px 30px 0 0'}}
          onMouseOut={e  => (e.currentTarget.style.backgroundImage = `url(${imageUrl[0]})`)}
          onMouseOver={e  => (e.currentTarget.style.backgroundImage = `url(${imageUrl[1]})`)}
        ></div>
      </Link>
      <Link to={`/admin-panel/getproduct/${_id}`} className={styles.product__card_title}>
        {name}
      </Link>
      <div className={styles.product__card_price}>
        {price} ₽
      </div>
      <div className={styles.product__card_viewCounts}>
        Просмотры {viewsCount}
      </div>
    </div>
  );
};
