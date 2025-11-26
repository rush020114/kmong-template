import React from 'react';

const ItemCard = ({ item, onClick }) => {
  return (
    <div
      className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col overflow-hidden cursor-pointer"
      onClick={() => onClick()}
    >
      {/* 이미지 영역 */}
      {item.imageList?.length > 0 && (
        <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center">
          <img
            src={`${import.meta.env.VITE_API_URL}/uploads/item/${item.imageList[0].attachedImgName}`}
            alt={item.title}
            className="max-h-full max-w-full object-contain p-2"
          />
        </div>
      )}

      {/* 텍스트 영역 */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {item.title}
        </h3>
        {/* 필요하다면 설명이나 가격 같은 추가 정보 */}
        {/* <p className="text-sm text-gray-600">{item.description}</p> */}
      </div>
    </div>
  );
};

export default ItemCard;