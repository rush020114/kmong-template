import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PopupMenu from '../components/PopupMenu'

const Header = () => {
  const [popupOpen, setPopupOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* 브랜드 */}
          <Link 
            to="/" 
            className="text-xl font-bold text-gray-900 transition-colors hover:text-blue-600"
          >
            KMONG
          </Link>

          {/* 오른쪽: ⋮ 버튼 */}
          <div className="relative">
            <button 
              onClick={() => setPopupOpen(!popupOpen)} 
              className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
              aria-label="메뉴 열기"
            >
              <span className="text-2xl leading-none">⋮</span>
            </button>

            {popupOpen && (
              <PopupMenu onClose={() => setPopupOpen(false)} />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header