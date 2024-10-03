import AdvantagesSections from "../../components/AdvatagesSections/AdvantagesSections.tsx";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection.tsx";
import css from "./HomePage.module.css"




const HomePage: React.FC = () => {
  return (
    <section className={css.main_page}>
   
        <WelcomeSection/>
      <AdvantagesSections/>
    </section>
  );
};

export default HomePage;