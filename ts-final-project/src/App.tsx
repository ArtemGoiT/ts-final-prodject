
import { lazy, Suspense } from 'react'
import css from "./App.module.css"
import SharedLayout from './components/SharedLayout/SharedLayout';
import { Route, Routes } from 'react-router-dom';
import RestrictedRoute from './RestrictedRoute';

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const SinglInPage = lazy(() => import ("./pages/SinglInPage/SinglInPage"))




const App: React.FC = () => {
  return (
    <div className={css.app}>
 <SharedLayout>
     <HomePage/>
     <SinglInPage/>
  <Suspense fallback={null}>
    <Routes>
      <Route 
      path="/"
      element={
        <RestrictedRoute
      component={HomePage}
      redirectTo="/tracker"
      />
      }
      />
      <Route
      path='/signin'
      element={
        <RestrictedRoute
        component={SinglInPage}
        redirectTo='/tracker'
        />
      }
      />
    </Routes>
    </Suspense>
</SharedLayout> 
    </div>
  );
};

export default App
