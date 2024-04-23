import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import TrackerScreen from './pages/TrackerScreen';
import LoginScreen from './pages/LoginScreen';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterScreen from './pages/RegisterScreen';
import HomeScreen from './pages/HomeScreen';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path: "/Login",
    element: <LoginScreen />,
  },
  {
    path: "/Register",
    element: <RegisterScreen />,
  },
  {
    path: "/TrackerScreen",
    element: <TrackerScreen />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();

