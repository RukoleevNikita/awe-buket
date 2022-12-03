import React from 'react';

// import { Link } from 'react-router-dom';

import { CustomLink } from '../../UI/Link/CustomLink';
// import  logo  from '../../../assets/images/logo.png';


import styles from './Navigation.module.scss';

const setActive = ({isActive}) => isActive ? `${styles.activeLink}` : '';

export const Navigation = () => {
    
  return (
    <nav className={styles.navigation}>
      <ul>
        <li>
          <CustomLink to="/collection" className={setActive}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M1.25 3.875C1.25 1.90609 1.27108 1.25 3.875 1.25C6.47892 1.25 6.5 1.90609 6.5 3.875C6.5 5.84391 6.5083 6.5 3.875 6.5C1.2417 6.5 1.25 5.84391 1.25 3.875Z" stroke="#56392F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path fillRule="evenodd" clipRule="evenodd" d="M9.5 3.875C9.5 1.90609 9.52108 1.25 12.125 1.25C14.7289 1.25 14.75 1.90609 14.75 3.875C14.75 5.84391 14.7583 6.5 12.125 6.5C9.4917 6.5 9.5 5.84391 9.5 3.875Z" stroke="#56392F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path fillRule="evenodd" clipRule="evenodd" d="M1.25 12.125C1.25 10.1561 1.27108 9.5 3.875 9.5C6.47892 9.5 6.5 10.1561 6.5 12.125C6.5 14.0939 6.5083 14.75 3.875 14.75C1.2417 14.75 1.25 14.0939 1.25 12.125Z" stroke="#56392F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path fillRule="evenodd" clipRule="evenodd" d="M9.5 12.125C9.5 10.1561 9.52108 9.5 12.125 9.5C14.7289 9.5 14.75 10.1561 14.75 12.125C14.75 14.0939 14.7583 14.75 12.125 14.75C9.4917 14.75 9.5 14.0939 9.5 12.125Z" stroke="#56392F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <span>Все товары</span>
          </CustomLink>
        </li>
        <li><CustomLink to="/delivery" className={setActive}>Доставка и оплата</CustomLink></li>
        <li><CustomLink to="/photo-gallery" className={setActive}>Фотогалерея</CustomLink></li>
        <li><CustomLink to="/reviews" className={setActive}>Отзывы о нас</CustomLink></li>
      </ul>
    </nav>
  );
};



