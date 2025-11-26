import React, { useEffect, useState } from 'react'
import itemApi from '../apis/itemApi';

const ItemList = () => {

  // 조회한 목록을 저장할 state 변수
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {

        const res = await itemApi.getAll();
        setItemList(res);
      } catch (e) {
        if (typeof e.response?.data === 'object') {
          const messages = Object.values(e.response.data).join('\n');
          console.log(messages);
        } else {
          console.log(e.response?.data || e.message);
        }
      }
    }
    fetchItems();
  }, []);

  console.log(itemList)

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {itemList.map(item => (
        <div 
          key={item.id} 
          className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
        >
          {/* 이미지 영역 */}
          {item.imageList?.length > 0 && (
            <img 
              src={`${import.meta.env.VITE_API_URL}/uploads/item/${item.imageList[0].attachedImgName}`} 
              alt={item.title} 
              className="w-full h-48 object-cover"
            />
          )}

          {/* 텍스트 영역 */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
          </div>
        </div>
      ))}
    </div>

  )
}

export default ItemList