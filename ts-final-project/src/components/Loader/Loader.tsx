

import css from './Loader.module.css';
import clsx from 'clsx/lite';
import { useTranslation } from 'react-i18next';

interface LoaderProps {
  classCss?: string; 
}

const Loader: React.FC<LoaderProps> = ({ classCss }) => {
  const { t } = useTranslation();
  const className = clsx(css.wrapper, classCss && css[classCss]);

  return (
    <div className={className}>
      <div className={css.loader}></div>
      <div>{t('loader.loading')}</div>
    </div>
  );
};

export default Loader;
