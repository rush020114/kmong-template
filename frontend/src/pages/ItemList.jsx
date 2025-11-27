import React, { useEffect, useState } from 'react'
import itemApi from '../apis/itemApi';
import ItemCard from '../components/ItemCard';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../utils/errorHandler';

const ItemList = () => {

  const nav = useNavigate();

  // 조회한 목록을 저장할 state 변수
  const [itemList, setItemList] = useState([]);

  // 목록을 조회할 useEffect
  useEffect(() => {
    const fetchItems = async () => {
      try {

        const res = await itemApi.getAll();
        setItemList(res);
      } catch (e) {
        handleError(e, false);
      }
    }
    fetchItems();
  }, []);

  console.log(itemList)

  return (
    <div className="p-8">
      {itemList.length === 0 ? (
        <div className="text-center text-gray-500 py-12 text-3xl">
          목록을 등록해주세요!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {itemList.map(item => (
            <ItemCard
              onClick={() => nav(`${item.id}`)}
              key={item.id}
              item={item}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ItemList