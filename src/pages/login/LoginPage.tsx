import CButton from '../../components/CButton/CButton';
import CInput from '../../components/CInput/CInput';
import styles from './login.module.css';
import { useState, useEffect } from 'react';
import todoStore from '../../store/todoStore';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [pageStatus, setPageStatus] = useState('Login');
  const [error, setError] = useState('placeholder');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    todoStore.checkAuth().then(res => {
      if (res?.login) {
        navigate('/dashboard');
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      login,
      password,
    };
    let result =
      pageStatus === 'Login'
        ? await todoStore.signIn(body)
        : await todoStore.signUp(body);

    if (result?.error) {
      setError(result.error);
      setLogin('');
      setPassword('');
      return;
    }
    if (pageStatus === 'Register') {
      setMessage('Succeed, you can login now');
      return;
    }
    if (result.status === 'ok') {
      navigate('/dashboard');
    }
  };

  const handleChangeStatus = () => {
    setPageStatus(pageStatus === 'Login' ? 'Register' : 'Login');
    setError('placeholder');
    setMessage('');
    setLogin('');
    setPassword('');
  };

  return (
    <div className={styles.container}>
      <div className={styles['login-wrapper']}>
        <h1 className={styles.title}>{pageStatus}</h1>
        <form onSubmit={e => handleSubmit(e)} className={styles['login-form']}>
          <CInput
            onChange={e => {
              setLogin(e.target.value);
            }}
            value={login}
            type="text"
            placeholder="Login"
            width="standart"
          />
          <CInput
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            width="standart"
          />
          <CButton type="submit" size="bigger" variant="primary">
            Submit
          </CButton>
        </form>
        {!message.length && (
          <p
            className={
              error !== 'placeholder' ? styles.error : styles.transparent
            }
          >
            {error}
          </p>
        )}
        {!!message.length && (
          <p className={message.length ? styles.message : styles.transparent}>
            {message}
          </p>
        )}
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
};

export default LoginPage;
