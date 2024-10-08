import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import css from './AdvatagesSections.module.css';
import { axiosInstance } from '../../servise/axiosConfig';

const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const AdvantagesSections: React.FC = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const { t } = useTranslation();
  const currentLang = localStorage.getItem('i18nextLng');

  const isEngLanguage = currentLang === 'en';
  useEffect(() => {
    const getUsersCount = async () => {
      try {
        const response = await axiosInstance.get<{ data: number }>(
          'user/count',
        );
        const data = response.data;
        setUserCount(data);
      } catch (error) {
        console.log('error', error);
      }
    };
    getUsersCount();
  }, []);
  return (
    <div className={css.advantages_section}>
      <div className={css.advantages_info__block}>
        <div
          className={`${css.customers_block} ${
            isEngLanguage ? css.customers_block_en : css.customers_block_ua
          }`}
        >
          <ul className={css.customers_icons__list}>
            <li className={css.customers_icons__item} />
            <li className={css.customers_icons__item} />
            <li className={css.customers_icons__item} />
          </ul>
          {userCount === 0 ? (
            <p className={css.customers_info}>
              {t('Our')}&nbsp;
              <span className={css.customers_icons__span}>
                {t('happy', { count: userCount })}
              </span>
              &nbsp;
              {t('customers', { count: userCount })}
            </p>
          ) : (
            <p className={css.customers_info}>
              {capitalizeFirstLetter(t('our', { count: userCount }))}&nbsp;
              <span className={css.customers_info__span}>
                {t('happy', { count: userCount })}
              </span>
              &nbsp;
              {t('customers', { count: userCount })}
            </p>
          )}
        </div>

        <div className={css.benefits_info__wrap}>
          <div
            className={`${css.benefits_info__block} ${
              isEngLanguage
                ? css.benefits_info__block_eng
                : css.benefits_info__block_ua
            }`}
          >
            <p className={`${css.benefits_btn}  ${css.benefits_habits}`}>
              <span className={css.habits_roll} />
              {t('Habit drive')}
            </p>
            <p className={`${css.benefits_btn}  ${css.benefits_statistics}`}>
              {t('View statistics')}
            </p>
            <p
              className={`${css.benefits_btn}   ${css.benefits_personal__rate}`}
            >
              {t('Personal rate setting')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvantagesSections;
