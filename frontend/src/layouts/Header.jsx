import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PopupMenu from '../components/PopupMenu'

const Header = () => {
  const [popupOpen, setPopupOpen] = useState(false)

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

          {/* 오른쪽: ⋮ 버튼 */}
          <div className="relative">
            <button 
              onClick={() => setPopupOpen(!popupOpen)} 
              className="text-2xl text-gray-600 cursor-pointer transition-colors"
              aria-label="메뉴 열기"
            >
              ⋮
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