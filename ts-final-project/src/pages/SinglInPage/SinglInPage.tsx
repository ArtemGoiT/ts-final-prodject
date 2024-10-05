import { Toaster } from 'react-hot-toast';


import css from './SinglInPage.module.css';
import AdvantagesSections from '../../components/AdvatagesSections/AdvantagesSections';
import SinglInFrom from '../../components/SinglInFrom/SinglInFrom';




const SignInPage: React.FC = () => {
  return (
    <>
      <div className={css.wrapper}>
        <div className={css.form}>
          <SinglInFrom />
        </div>
        <div className={css.box}>
          <AdvantagesSections />
        </div>
        <Toaster position="top-right" />
      </div>
    </>
  );
};

export default SignInPage;
