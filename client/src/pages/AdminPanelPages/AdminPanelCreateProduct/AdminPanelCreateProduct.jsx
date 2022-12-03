import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import { Container } from '../../../components';
import { AdminPanelHeader } from '../../../components/AdminPanelComponents/AminPanelHeader/AminPanelHeader';
import { ImageDropzone } from '../../../components/AdminPanelComponents/Image dropzone/ImageDropzone';
import { selectIsAuth } from '../../../redux/slices/authSlice';
import { createProduct } from '../../../redux/slices/productsSlice';

import styles from './CreateProduct.module.scss';

export const AdminPanelCreateProduct = () => {
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [previewError, setPreviewError] = React.useState(false); 
  const [name, setName] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [previewUrl, setPreviewUrl] = React.useState([]);
  const [mainPhotosUrl, setMainPhotosUrl] = React.useState([]);

  const handleCreateProduct = React.useCallback((e) => {
    const fields = {
      name,
      category,
      price,
      description,
      previewUrl,
      mainPhotosUrl,
    };
    e.preventDefault();
    dispatch(createProduct(fields)).then(res => {
      console.log(res.error);
    });
  }, [name, price, description, previewUrl, mainPhotosUrl]);

  if (!window.localStorage.getItem('token') && !Boolean(isAuth.data)) {
    return <Navigate to="/admin-panel" />;
  }

  return (
    <>
      <AdminPanelHeader />
      <Container>
        <div className={styles.form}>
          <form className={styles.form}>
            <h1 style={{margin: '30px'}}>создаем карточку товара</h1>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '30px'}}>
              <button
                onClick={() => navigate(-1)}
                className={styles.form__btn}
                type="submit"
              >
                назад
              </button>
              <button
                onClick={ handleCreateProduct }
                className={styles.form__btn}
              >
                создать
              </button>
            </div>
            <input type="text"
              name="name"
              placeholder="название товара"
              onChange={(e) => setName(e.target.value)}
            />
            <input type="text"
              name="name"
              placeholder="категория товара"
              onChange={(e) => setCategory(e.target.value)}
            />
            <input type="text"
              name="price"
              placeholder="цена товара"
              onChange={(e) => setPrice(e.target.value)}
            />
            <textarea cols="30" rows="10" name="description" placeholder="описание товара" onChange={(e) => setDescription(e.target.value)}></textarea>
            
            <div style={{marginBottom: '30px'}}>
              <p style={{marginBottom: '10px'}}>Две фотографии для превью</p>
              <ImageDropzone value={previewUrl}  name="previewUrl" onChange={(e) => {setPreviewUrl(e);}}/>
            </div>

            {/* стилизовать ошибки */}
            {previewError && <p>загрузить можно только две фотографии</p>} 
            
            <div>
              <p style={{marginBottom: '10px'}}>Основные фотографии товара</p>
              <ImageDropzone value={previewUrl}  name="previewUrl" onChange={(e) => {setMainPhotosUrl(e);}}/>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
};

