import React from 'react';
import { useDropzone } from 'react-dropzone';

import remove from '../../../assets/images/remove.png';

import axios from '../../../axios';

import styles from './ImageDropzone.module.scss';

export const ImageDropzone = ({value, onChange, name}) => {
  const [previewUrl, setPreviewUrl] = React.useState([]);
  const [mainPhotosUrl, setMainPhotosUrl] = React.useState([]);
  const [previewLoading, setPreviewLoading] = React.useState(false);
  const [mainPhotosLoading, setMainPhotosLoading] = React.useState(false);

  async function fotoUpload(key, el) {
    const formData = new FormData();
    const files = el;

    for(let i = 0; i < files.length; i++) {
      formData.append(`${key}`, files[i]);
    }

    const { data } = await axios.post('/admin-panel/upload', formData);
    const arrayLinks = data.urls.map(e => e);

    return arrayLinks;
  };

  const onDrop = React.useCallback(async (acceptedFiles) => {
    try {
      if (name === 'previewUrl') {
        fotoUpload('previewUrl', acceptedFiles).then(res => {
          previewUrl.length === 0 ? setPreviewUrl(res) : setPreviewUrl(previewUrl.concat(res));  
          setPreviewLoading(true);
        });
      }
    
      if (name === 'mainPhotos' ) { 
        fotoUpload('mainPhotos', acceptedFiles).then(res => {
          mainPhotosUrl.length === 0 ? setMainPhotosUrl(res) : setMainPhotosUrl(mainPhotosUrl.concat(res)); 
          setMainPhotosLoading(true);
        });
      }
    } catch (err) {
      console.warn(err);
      alert('Ошибка при загрузке файла!');
    }
  });
          
  if (previewLoading) onChange(previewUrl);
  if (mainPhotosLoading) onChange(mainPhotosUrl);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', 'jpg']
    }
  });

  const removeBlock = (item) => {
    setPreviewUrl(prevState => prevState.filter(el => el !== item));
  };

  return (
    <>
      <div {...getRootProps()} className={styles.dropZone}>
        <input {...getInputProps()} />
        {!isDragActive && (<p>Перетащите несколько файлов... Или нажмите для выбора фото</p>)}
      </div>

      <div className={styles.previewImg}>
        {
          previewUrl.length !== 0 ? 
            (
              name === 'previewUrl' ? (previewUrl.map((el, i) => (
                <div className={styles.previewImg__imageBox} key={`${el}`}>
                  <img src={`http://localhost:4444/admin-panel/${el}`} className={styles.previewImg__imageBox_img} />
                  <img src={remove} alt="remove" className={styles.previewImg__imageBox_remove} onClick={() => removeBlock(el)} />
                </div> 
              ))) : (<p>Загрузите фото превью</p>)
            ) : 
            mainPhotosUrl.length !== 0 ?
              (
                name === 'mainPhotosUrl' ? (mainPhotosUrl.map((el, i) => (
                  <div className={styles.imageBox} key={`${el}`}>
                    <img src={`http://localhost:4444/admin-panel/${el}`} className={styles.dropZone__imageBox_img} onClick={() => removeBlock(el)} /> 
                    <img src={remove} alt="remove" className={styles.dropZone__imageBox_remove} />
                  </div>
                ))) : (<p>Загрузите основные фотографии товара</p>)
              ) : (<></>)
        }
        
      </div>
    </>
  );
};