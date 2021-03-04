import React from 'react';
import Layout from 'layouts/DashboardLayout/Layout.js';
import LoginPage from "views/LoginPage/LoginPage.js";
import RegisterPage from "views/RegisterPage/RegisterPage.js";
import MainLayout from "layouts/MainLayout/MainLayout.js"


const routes = [
  {
    path: 'app',
    element: <Layout />,
    children: [
      { path: 'home', element: <LoginPage /> },
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'RegisterPage', element: <RegisterPage /> },
    ]
  }
];

export default routes;
