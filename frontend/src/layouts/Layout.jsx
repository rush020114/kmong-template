import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <>
      <Header />
      <div className="mt-4 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;