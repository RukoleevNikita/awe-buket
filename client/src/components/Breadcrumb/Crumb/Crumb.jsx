// import React from 'react';
// import { useNavigate, useLocation, useMatch } from 'react-router-dom';

// import { Icon } from '../../UI/Icon/Icon';

// import cls from './Crumb.module.scss';

// export const Crumb = ({className, path, title, uirl}) => {
//   const history = useNavigate();
//   const { state } = useLocation();
//   const match = useMatch(path);

//   const renderTitle = () => {
//     if (title === 'Home') {
//       return <Icon className={cls.crumbsIconHome} />;
//     } else {
//       return title;
//     }
//   };
    
//   return (
//     <span>
//       {match && match.isExact ? (
//         renderTitle()
//       ) : (
//         <>
//           <div></div>
//         </>
//       )}
//     </span>
//   );
// };



