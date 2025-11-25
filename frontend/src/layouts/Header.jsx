import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-white font-sans shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* 브랜드 */}
          <Link 
            to="/" 
            className="text-xl font-bold text-gray-900 hover:text-yellow-500 transition-colors"
          >
            KMONG
          </Link>

          {/* 오른쪽 메뉴 */}
          <nav className="flex items-center gap-6">
            <Link 
              to="/about" 
              className="text-gray-600 hover:text-secondary transition-colors"
            >
              소개
            </Link>
            <Link 
              to="/post" 
              className="text-gray-600 hover:text-secondary transition-colors"
            >
              글쓰기
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-600 hover:text-secondary transition-colors"
            >
              문의
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header