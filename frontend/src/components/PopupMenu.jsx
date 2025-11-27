import React from 'react'
import { Link } from 'react-router-dom'

const PopupMenu = ({ onClose }) => {
  return (
    <>
      {/* 오버레이: 메뉴 뒤 배경 */}
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose} 
      />

      {/* 메뉴 박스 */}
      <div className="absolute top-8 right-0 bg-white border border-gray-200 shadow-md rounded-md w-40 z-50 overflow-hidden">
        <nav className="flex flex-col">
          <Link 
            to="/item-form" 
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={onClose}
          >
            상품 등록
          </Link>
          <Link 
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={onClose}
          >
            소개
          </Link>
        </nav>
      </div>
    </>
  )
}

export default PopupMenu