import { React } from 'react';
import { useForm } from 'react-hook-form';
import { SpinnerDotted } from 'spinners-react'; // https://github.com/adexin/spinners-react

import styles from './FormLogin.module.scss';

export const AdminPanelForm = ({submit, status}) => {
  const isProductLoading = status === 'loading';

  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: 'bubnov.evgen@mail.ru',
      password: 'snJebye2Nj23',
    },
    mode: 'onBlur' // all, onChange
  });

  return (
    <>
      {isProductLoading ? (
        <SpinnerDotted size={90} thickness={140} speed={99} color="rgba(43, 42, 41, 1)" className={styles.spinner} />
      ) : (
        <div>
          <form onSubmit={handleSubmit(submit)} action="" className={styles.form}>
            <h5 className={styles.form__title}>Войти в панель администратора</h5>

            <div className={styles.form__group}>
              <input 
                className={styles.form__input}
                type="email"
                {...register('email', { required: 'введите почту' })}
                placeholder=" "
              />
              <div>{errors?.email && <p>{errors?.email?.message}</p>}</div>
              <label className={styles.form__label}>Email</label>
            </div>

            <div className={styles.form__group}>
              <input 
                className={styles.form__input}
                type="password"
                {...register('password', { required: 'введите пароль' })}
                placeholder=" "
              />
              <div>{errors?.password && <p>{errors?.password?.message}</p>}</div> 
              <label className={styles.form__label}>Password</label>
            </div>

            <button
              className={styles.form__btn}
              type="submit"
            >
          войти
            </button>
          </form>
        </div>
      )
      }</>
  );
};