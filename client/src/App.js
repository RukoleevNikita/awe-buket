import React from 'react';
import { useDispatch  } from 'react-redux';

import { fetchLogin } from './redux/slices/authSlice';
import { Routing } from './routes/routes';

import './App.css';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchLogin());
  }, [dispatch]);
  
  return (
    <>
      <Routing />
    </>
  );
}

export default App;
