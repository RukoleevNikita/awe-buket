import React from 'react';

import { useDispatch, useSelector  } from 'react-redux';

import { useParams, Navigate } from 'react-router-dom';

import axios from '../../../axios';

import { selectIsAuth } from '../../../redux/slices/authSlice';

import { fetchUpdateProduct } from '../../../redux/slices/productsSlice';

import { Container } from '../../../components';


import { AdminPanelHeader } from '../../../components/AdminPanelComponents/AminPanelHeader/AminPanelHeader';

import styles from './AdminPanelProductChange.module.scss';

export const AdminPanelProductChange = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);

  const [previewError, setPreviewError] = React.useState(false); 
  const [mainPhotosError, setMainPhotosError] = React.useState(false);
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [previewUrl, setPreviewUrl] = React.useState([]);
  const [mainPhotosUrl, setMainPhotosUrl] = React.useState([]);

  const { id } = useParams();

  React.useEffect(() => {
    if (id) {
      axios
        .get(`/admin-panel/getproduct/${id}`)
        .then((res) => {
          setData(res.data);

          res.data.previewUrl.map(e => previewUrl.push(e));
          res.data.mainPhotosUrl.map(e => mainPhotosUrl.push(e));
          
          setLoading(false);
        })
        .catch((err) => {
          console.warn(err);
          alert('Ошибка при получении товара');
        });
    }
  }, []);

  const handleChangeFile = async (event) => {
    try {
      if (event.target.name === 'previewUrl') {
        event.target.files.length > 2 ? setPreviewError(true) : setPreviewError(false);

        const formData = new FormData();
        const files = event.target.files;
        
        for(let i = 0; i < files.length; i++) {
          formData.append('previewUrl', files[i]);
        }

        const { data } = await axios.post('/admin-panel/upload', formData);
        const arrayLinks = data.urls.map(e => e);
        setPreviewUrl(arrayLinks);        
      }

      if (event.target.name === 'mainPhotos' ) { 
        event.target.files.length > 10 ? setMainPhotosError(true) : setMainPhotosError(false);
        const formData = new FormData();
        const files = event.target.files;
        
        for(let i = 0; i < files.length; i++) {
          formData.append('mainPhotosUrl', files[i]);
        }

        const { data } = await axios.post('/admin-panel/upload', formData);
        const arrayLinks = data.urls.map(e => e);
        setMainPhotosUrl(arrayLinks);  
      }

    } catch (err) {
      console.warn(err);
      alert('Ошибка при загрузке файла!');
    }
  };

  const onSubmit = React.useCallback(async (e) => {

    const fields = {
      name,
      price,
      description,
      previewUrl,
      mainPhotosUrl,
      id
    };
    e.preventDefault();

    dispatch(fetchUpdateProduct(fields)).then(res => {
      console.log(res.error);
    });
  });

  if (!window.localStorage.getItem('token') && !Boolean(isAuth.data)) {
    return <Navigate to="/admin-panel" />;
  }

  return (
    <>
      <AdminPanelHeader />
      {
        isLoading ? <h1>Loading</h1> : 
          <Container>
            <div className={styles.formСhange}>
              <form>
                <h1>изменение карточки товара</h1>
                <div className={styles.formСhange__information}>
                  <p>название товара</p>
                  <input type="text" defaultValue={data.name} className={styles.formСhange__information_title} onChange={(e) => setName(e.target.value)}/>
                  <p>описание товара</p>
                  <textarea cols="30" rows="10" className={styles.formСhange__information_description} onChange={(e) => setDescription(e.target.value)}>
                    {data.description}
                  </textarea>
                  <p>цена товара</p>
                  <input type="text" defaultValue={`${data.price} ₽`} className={styles.formСhange__information_price} onChange={(e) => setPrice(e.target.value)}/>
                  <p>Две фотографии для превью</p>
                  <input 
                    type="file"
                    multiple  
                    name="previewUrl"
                    placeholder="изображения товара"
                    onChange={ handleChangeFile }
                  />
                  {/* стилизовать ошибки */}
                  {previewError && <p>загрузить можно только две фотографии</p>} 
            
                  <p>Основные фотографии товара</p>
                  <input 
                    type="file"
                    multiple
                    name="mainPhotos"
                    placeholder="изображения товара"
                    onChange={ handleChangeFile }
                  />
                </div>
                <div>
                  <button
                    onClick={onSubmit}
                    className={styles.form__btn}
                    type="submit"
                  >
                    Сохранить 
                  </button>
                </div>
              </form>
            </div>
          </Container>
      }
    </>
  );
};

