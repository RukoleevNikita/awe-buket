import React from 'react';

import styles from './Slider.module.scss';

export const Slider = (props) => {
  const arrLink = Object.values(props);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [imageLinks, setImageLinks] = React.useState(arrLink[0]);


  const handlerBtn = (index) => {
    setImageLinks(arrLink[index]);
    setActiveIndex(index);
  };
 
  return (
    <>
      <div className={styles.slider}>
        <div className={styles.slider__leftArea}>
          {
            Object.values(props).map((link, i) => (
              <img src={link} key={i} alt="" onClick={() => handlerBtn(i)} className={activeIndex === i ? styles.active : ''} /> 
            ))
          }
        </div>
        <div className={styles.slider__rightArea} style={{backgroundImage: `url(${imageLinks})`}}>
        </div>
      </div>
    </>
  );
};

