import React, { useEffect, useState } from 'react'
import itemApi from '../apis/itemApi';
import ItemCard from '../components/ItemCard';
import { useNavigate } from 'react-router-dom';

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
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {itemList.map(item => (
        <ItemCard 
        onClick={() => nav(`${item.id}`)}
          key={item.id} 
          item={item} 
        />
      ))}
  </div>
  )
}

export default ItemList