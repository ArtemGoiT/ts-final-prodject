import React from 'react'; // Убедитесь, что React импортирован
import { useTranslation } from 'react-i18next';
import css from './ChangeLanguageBtn.module.css';

// Интерфейс для пропсов
interface ChangeLanguageBtnProps {
  className?: string; // Опциональный пропс для дополнительных классов
  activeClassName?: string; // Опциональный пропс для класса активного языка
}

// Объект с языками
const lngs: Record<string, { nativeName: string }> = {
  en: { nativeName: 'EN' },
  ua: { nativeName: 'UA' },
};

// Функциональный компонент с типизацией
const ChangeLanguageBtn: React.FC<ChangeLanguageBtnProps> = ({
  className = '',
  activeClassName = '',
}) => {
  const { i18n } = useTranslation();

  return (
    <div className={css.buttons}>
      {Object.keys(lngs).map((lng) => (
        <button
          type="button" // Измените на "button", так как это не отправляет форму
          key={lng}
          onClick={() => i18n.changeLanguage(lng)} // Изменение языка
          disabled={i18n.resolvedLanguage === lng}
          className={`${
            i18n.resolvedLanguage === lng
              ? (activeClassName || css.active_language)
              : ''
          } ${className}`}
        >
          {lngs[lng].nativeName}
        </button>
      ))}
    </div>
  );
};

export default ChangeLanguageBtn;
