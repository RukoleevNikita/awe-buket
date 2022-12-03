import React from 'react';
import { SpinnerDotted } from 'spinners-react'; // https://github.com/adexin/spinners-react
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { fetchRemoveProduct } from '../../../redux/slices/productsSlice';


import useOnScreen from '../../../hooks/useOneScreen';

import styles from './ProductsCards.module.scss';

export const ProductsCards = ({
  _id = '',
  description = '',
  previewUrl = [],
  name = '',
  price = 0,
  viewsCount = 0,
  onLoad = () => {}
}) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const imageRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const isVisible = useOnScreen(containerRef);

  React.useEffect(() => {
    if (!isVisible || isLoaded) {
      return;
    }
    if (!imageRef.current) {
      imageRef.current.onload = () => {
        setIsLoaded(true);
        onLoad();
      };
    }
  }, [isVisible, onLoad, isLoaded]);

  const onClickRemove = () => {
    if (window.confirm('Вы действительно хотите удалить товар?')) dispatch(fetchRemoveProduct(_id));
  };

  return (
    <div ref={containerRef}>
      {
        (isVisible || isLoaded) && (
          <div className={styles.product__card_wrapper}>
            <Link to={`/admin-panel/product/${_id}`}>
              <div
                ref={imageRef}
                style={{'backgroundImage': `url(${previewUrl[0]})`, 'backgroundSize': 'cover', 'paddingTop': '133%', 'borderRadius': '30px 30px 0 0'}}
                onMouseOut={e  => (e.currentTarget.style.backgroundImage = `url(${previewUrl[0]})`, e.currentTarget.style.transition = '4s')}
                onMouseOver={e  => (e.currentTarget.style.backgroundImage = `url(${previewUrl[1]})`, e.currentTarget.style.transition = '4s')}
              ></div>
            </Link>
            <div className={styles.product__card__panel}>
              <div className={styles.product__card__panel_information}>
                <Link to={`/admin-panel/product/${_id}`} className={styles.product__card__panel_information_title}>
                  {name}
                </Link>
                <div className={styles.product__card__panel_information_price}>
                  {price} ₽
                </div>
                <div className={styles.product__card__panel_information_viewCounts}>
                Просмотры: {viewsCount}
                </div>
              </div>
              <div className={styles.product__card__panel_control}>
                <div className={styles.product__card__panel_control_delete} onClick={onClickRemove}>
                  Удалить товар
                </div>

                <Link to={`/admin-panel/product/${_id}/edit`} className={styles.product__card__panel_control_change}>
                  Изменить
                </Link>
              </div>
            </div>

          </div>
        )
      }
    </div>
    
  );
};
