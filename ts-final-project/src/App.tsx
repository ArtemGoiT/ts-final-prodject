
import { lazy, Suspense } from 'react'
import css from "./App.module.css"
import SharedLayout from './components/SharedLayout/SharedLayout';
import { Route, Routes } from 'react-router-dom';
import RestrictedRoute from './RestrictedRoute';
import PrivateRoute from './PrivateRoute';


const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const SinglInPage = lazy(() => import ("./pages/SinglInPage/SinglInPage"))
const SignUpPage = lazy(() => import('./pages/SinglUpPage/SinglUpPage'));
const TrackerPage = lazy(() => import('./pages/TrackerPage/TrackerPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const ResetPasswordPage = lazy(() =>
  import('./pages/ResetPasswordPage/ResetPasswordPage'),
);
const EmailInputPage = lazy(() =>
  import('./pages/EmailInputPage/EmailInputPage'),
);
const GoogleAuthPage = lazy(() =>
  import('./pages/GoogleAuthPage/GoogleAuthPage'),
);




const App: React.FC = () => {
  return (
    <div className={css.app}>
 <SharedLayout>
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
 <Route
              path="/signup"
              element={
                <RestrictedRoute
                  component={SignUpPage }
                  redirectTo="/tracker"
                />
              }
            />
            <Route
              path="/tracker"
              element={
                <PrivateRoute component={TrackerPage } redirectTo="/" />
              }
            />
            <Route
              path="/reset-password"
              element={
                <RestrictedRoute
                  component={ResetPasswordPage }
                  redirectTo="/"
                />
              }
            />
            <Route
              path="/email-input"
              element={
                <RestrictedRoute
                  component={EmailInputPage }
                  redirectTo="/"
                />
              }
            />
            <Route path="/users/tracker" element={<GoogleAuthPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </SharedLayout>
    </div>
  );
};

export default App
