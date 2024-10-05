import { useId, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import css from "./SinglInFrom.module.css"
import sprite from "../../imges/sprait/sprite.svg"
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import Logo from "../Logo/Logo";
import Loader from "../Loader/Loader";
import ChangeLanguageBtn from "../ChangeLanguageBtn/ChangeLanguageBtn";



interface SignInFormData {
  email: string;
  password: string;
}

const SinglInFrom: React.FC = () => {
  const { t } = useTranslation();
  const emailId = useId();
  const passwordId = useId();
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('validation.email_invalid'))
      .required(t('validation.email_required'))
      .matches(
        /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        'Введите действительный адрес электронной почты',
      ),
    password: Yup.string()
      .min(10, t('validation.password_min'))
      .required(t('validation.password_required')),
  });

  // Настраиваем react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<SignInFormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  });

  // Обрабатываем отправку формы
  const onSubmit: SubmitHandler<SignInFormData> = (values) => {
    setLoading(true);
    dispatch(
      loginUser({
        email: values.email,
        password: values.password,
      }),
    )
      .unwrap()
      .then(() => {
        toast.success(t('signIn.successMessage'), {
          duration: 2500,
        });
        reset();
        navigate('/tracker');
      })
      .catch(() => {
        toast.error(t('signIn.errorMessage'), {
          duration: 2500,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className={css.wrapper_logo}>
        <div className={css.logo}>
          <Logo />
        </div>
        <ChangeLanguageBtn />
      </div>
      {loading && <Loader />}
      <div className={css.wrapperSignIn}>
        <h2 className={css.title}>{t('signIn.title')}</h2>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          className={css.form}
        >
          <div className={css.field}>
            <label htmlFor={emailId} className={css.label}>
              {t('signIn.email')}
            </label>
            <input
              type="email"
              {...register('email')}
              id={emailId}
              placeholder={t('signIn.placeholderEmail')}
              className={`${css.input} ${errors.email ? css.error : ''}`}
              onBlur={() => trigger('email')}
            />
            {errors.email && (
              <p className={css.errorMessage}>{errors.email.message}</p>
            )}
          </div>

          <div className={css.field}>
            <label htmlFor={passwordId} className={css.label}>
              {t('signIn.password')}
            </label>
            <div className={css.wrapper_icon}>
              <input
                type={visiblePassword ? 'text' : 'password'}
                {...register('password')}
                id={passwordId}
                placeholder={t('signIn.placeholderPassword')}
                className={`${css.input} ${
                  errors.password ? css.error : ''
                }`}
                onBlur={() => trigger('password')}
              />
              <svg
                className={css.icon_eye}
                width={20}
                height={20}
                onClick={() => setVisiblePassword(!visiblePassword)}
              >
                <use
                  href={`${sprite}#${
                    visiblePassword ? 'icon-eye' : 'icon-eye-off'
                  }`}
                />
              </svg>
            </div>
            {errors.password && (
              <p className={css.errorMessage}>{errors.password.message}</p>
            )}
          </div>
          <div className={css.btn_wrapper}>
            <button type="submit" className={css.btn}>
              {t('signIn.buttonSignIn')}
            </button>
            <GoogleAuth buttonText={t('signIn.googleAuth')} />
          </div>
        </form>
        <p className={css.auth}>
          {t('signIn.accountPrompt')}
          <NavLink className={css.navlink} to="/signup">
            {t('signIn.signUp')}
          </NavLink>
        </p>
        <p className={css.recover}>
          {t('signIn.recoverPrompt')}
          <NavLink className={css.navlink} to="/email-input">
            {t('signIn.recoverPassword')}
          </NavLink>
        </p>
      </div>
    </>
  );
};


export default SinglInFrom
