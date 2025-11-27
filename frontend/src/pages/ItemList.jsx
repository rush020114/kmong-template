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
    <div>
      {itemList.length === 0 ? (
        <div className="flex min-h-[50vh] items-center justify-center rounded-lg bg-white">
          <p className="text-lg text-gray-400">
            목록을 등록해주세요!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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