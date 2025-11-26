import React, { useEffect, useState } from 'react'
import itemApi from '../apis/itemApi';
import { useParams } from 'react-router-dom';

const ItemDetail = () => {

  const {id} = useParams();

  // 상세 목록을 저장할 state 변수
  const [itemDetail, setItemDetail] = useState({});

  // 상세 목록을 조회할 useEffect
  useEffect(() => {
    const fetchItems = async () => {
      try {

        const res = await itemApi.get(id);
        setItemDetail(res);
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

  console.log(itemDetail)

  return (
    <div>ItemDetail</div>
  )
}

export default ItemDetail