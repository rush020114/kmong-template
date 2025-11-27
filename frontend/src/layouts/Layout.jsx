import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 상단 영역: 회색 배경 */}
      <div className="flex-grow bg-gray-50">
        <Header />
        <main className="mt-4 mx-auto max-w-7xl px-3 sm:px-6 lg:px-0">
          <Outlet />
        </main>
      </div>

      {/* 하단 영역: Footer 배경 따로 */}
      <Footer />
    </div>
  );
};

export default Layout;