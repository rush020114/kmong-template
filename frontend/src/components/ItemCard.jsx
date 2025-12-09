import React from 'react';

const ItemCard = ({ item, onClick, isDelete, checkedItems, checkItem }) => {
  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md"
      onClick={() => onClick()}
    >
      {isDelete && (
        <div className="absolute left-3 top-3 z-10">
          <input
            type="checkbox"
            value={item.id}
            checked={checkedItems.includes(item.id)}
            onChange={e => checkItem(e)}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      {/* 이미지 영역 */}
      {item.imageList?.length > 0 && (
        <div className="aspect-square w-full overflow-hidden bg-gray-100">
          <img
            src={`${import.meta.env.VITE_API_URL}/uploads/item/${item.imageList[0].attachedImgName}`}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      {/* 텍스트 영역 */}
      <div className="p-4">
        <h3 className="line-clamp-2 text-base font-medium text-gray-900">
          {item.title}
        </h3>
        {/* 필요하다면 설명이나 가격 같은 추가 정보 */}
        {/* <p className="text-sm text-gray-600">{item.description}</p> */}
      </div>
    </div>
  );
};

export default ItemCard;