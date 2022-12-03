import React from 'react';
import { SpinnerDotted } from 'spinners-react'; // https://github.com/adexin/spinners-react
import { Link } from 'react-router-dom';


import useOnScreen from '../../hooks/useOneScreen';

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
  
  return (
    <div ref={containerRef}>
      {(isVisible || isLoaded) && (<div className={styles.product__card_wrapper}>
        <Link to={`/product/${_id}`}>
          <div
            ref={imageRef}
            style={{'backgroundImage': `url(${previewUrl[0]})`, 'backgroundSize': 'cover', 'paddingTop': '133%', 'borderRadius': '30px 30px 0 0'}}
            onMouseOut={e  => (e.currentTarget.style.backgroundImage = `url(${previewUrl[0]})`, e.currentTarget.style.transition = '1s')}
            onMouseOver={e  => (e.currentTarget.style.backgroundImage = `url(${previewUrl[1]})`, e.currentTarget.style.transition = '1s')}
          ></div>
        </Link>
        <Link to={`/product/${_id}`} className={styles.product__card_title}>
          {name}
        </Link>
        <div className={styles.product__card_info}>
          <span>{price} ₽</span>
          <Link to={`/product/${_id}`}>
            Выбрать
          </Link>
        </div>
      </div>)}
    </div>
  );
};