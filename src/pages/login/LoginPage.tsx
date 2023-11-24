import CButton from '../../components/CButton/CButton';
import CInput from '../../components/CInput/CInput';
import styles from './login.module.css';
import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ISubmit } from './types';
import { Store } from '../../store/types';

const LoginPage: React.FC<{ todoStore: Store }> = observer(({ todoStore }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [pageStatus, setPageStatus] = useState('Login');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ISubmit>();

  useEffect(() => {
    todoStore.checkAuth().then(res => {
      if (res?.login) {
        navigate('/dashboard');
      }
    });
  }, []);

  const onsubmit: SubmitHandler<ISubmit> = async data => {
    const body = {
      login: data.login,
      password: data.password,
    };
    let result =
      pageStatus === 'Login'
        ? await todoStore.signIn(body)
        : await todoStore.signUp(body);
    if ('error' in result) {
      reset();
      return;
    }
    if (result.status === 'ok') {
      navigate('/dashboard');
    }
  };

  const handleChangeStatus = () => {
    setPageStatus(pageStatus === 'Login' ? 'Register' : 'Login');
    reset();
  };

  return (
    <div className={styles.container}>
      <div className={styles['login-wrapper']}>
        <h1 className={styles.title}>{pageStatus}</h1>
        <form
          onSubmit={handleSubmit(onsubmit)}
          className={styles['login-form']}
        >
          <CInput
            onChange={e => {
              setLogin(e.target.value);
            }}
            value={login}
            name="login"
            register={register}
            validationSchema={{
              required: 'Login is required',
              minLength: {
                value: 5,
                message: 'Please enter a minimum of 5 characters',
              },
            }}
            type="text"
            placeholder="Login"
            width="standart"
          />
          <CInput
            value={password}
            onChange={e => setPassword(e.target.value)}
            name="password"
            register={register}
            validationSchema={{
              required: 'Password is required',
              minLength: {
                value: 5,
                message: 'Please enter a minimum of 5 characters',
              },
            }}
            type="password"
            placeholder="Password"
            width="standart"
          />
          <CButton type="submit" size="bigger" variant="primary">
            Submit
          </CButton>
        </form>
        <p
          className={
            errors.login?.message || errors.password?.message
              ? styles.error
              : styles.transparent
          }
        >
          {errors.login?.message || errors.password?.message}
        </p>

        <p className={styles.switch}>
          {pageStatus === 'Login'
            ? 'No account? '
            : 'Already have an account? '}
          <span className={styles.link} onClick={() => handleChangeStatus()}>
            {pageStatus === 'Login' ? 'Register' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
});

export default LoginPage;
