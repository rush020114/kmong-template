import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="mt-4 mx-auto max-w-7xl px-3 sm:px-6 lg:px-0">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;