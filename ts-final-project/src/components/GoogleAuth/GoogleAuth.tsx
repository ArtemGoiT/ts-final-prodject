import { useState, useEffect } from 'react';

import css from './GoogleAuth.module.css';
import { FcGoogle } from 'react-icons/fc';
import { NavLink } from 'react-router-dom';
import { axiosInstance } from '../../servise/axiosConfig';

// Определение типа данных, которые возвращает Axios
interface AuthUrlResponse {
  data: {
    url: string;
  };
}

// Типизация функции получения URL для авторизации
const getAuthUrl = (): Promise<{ data: AuthUrlResponse }> => 
  axiosInstance.get('/users/get-oauth-url');

// Типизация пропсов компонента GoogleAuth
interface GoogleAuthProps {
  buttonText: string;
}

const GoogleAuth: React.FC<GoogleAuthProps> = ({ buttonText }) => {
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    async function fetch() {
      const {
        data: { data },
      } = await getAuthUrl();
      setUrl(data.url);
    }
    fetch();
  }, []);

  return (
    <NavLink to={url} className={css.googleBtn}>
      <FcGoogle size={24} />
      {buttonText}
    </NavLink>
  );
};

export default GoogleAuth;
