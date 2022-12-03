import React from 'react';

import styles from './Categories.module.scss';

export const Categories = ({ eventHandler, activeIndex = 0 }) => {
  
  const CATEGORIES = ['Все товары', '1 сентября/учителю', 'Мужские букеты', 'Букеты', 'Ореховые/ сухофруктов букеты', 'Клубника в шоколаде в коробочке', 'Клубничные букеты', 'Букеты из шоколадных цветов', 'Подарки для детей', 'Шары и композиции'];
    
  return (
    <ul className={styles.category__navigation}>
      {
        CATEGORIES.map((el, i) => (
          <li key={i} onClick={() => eventHandler(i, CATEGORIES[i])} className={activeIndex === i ? styles.active : ''}>
            <span>{el}</span>
          </li>
        ))
      }
    </ul>
  );
};
