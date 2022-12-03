import { Link, useMatch } from 'react-router-dom';

import styles from './CustomLink.module.scss';

export const CustomLink = ({children, to, ...props}) => {
  const math = useMatch(to);

  return (
    <Link to={to} {...props} className={math ? `${styles.activeLink}` : `${styles.link}`}>
      {children}
    </Link>
  );
};