import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* 상단 영역: 회색 배경 */}
      <Header />
      
      <main className="mx-auto w-full max-w-7xl flex-grow px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      {/* 하단 영역: Footer 배경 따로 */}
      <Footer />
    </div>
  );
};

export default Layout;  