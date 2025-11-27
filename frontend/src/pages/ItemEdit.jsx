import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { handleError } from '../utils/errorHandler';
import itemApi from '../apis/itemApi';

const ItemEdit = () => {

  const nav = useNavigate();

  const {id} = useParams();

  // 수정할 값을 저장할 state 변수
  const [updateItemData, setUpdateItemData] = useState({});

  // 수정 데이터를 조회할 useEffect
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await itemApi.get(id);
        setUpdateItemData(res);
      } catch (e) {
        handleError(e, false);
      }
    }
    fetchItems();
  }, []);

  // 수정 데이터 핸들러 함수
  const handleChange = e => {
    setUpdateItemData({
      ...updateItemData
      , [e.target.name]: e.target.value
    });
  };

  // 수정 함수
  const handleSubmit = async () => {
    try {
      const res = await itemApi.update(id, updateItemData);
      alert(res);
      nav(`/${id}`);
    } catch (e) {
      handleError(e, false);
    }
  };


  console.log(updateItemData)

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col gap-6 mb-4">
      <header className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
        <input
          type="text"
          name="title"
          value={updateItemData.title || ''}
          onChange={e => handleChange(e)}
          className="text-2xl font-bold text-gray-800 border-b focus:outline-none"
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md"
        >
          저장
        </button>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white rounded-xl shadow p-6">
          {/* 이미지 업로드 input */}
          <input type="file" multiple />
        </div>
        <div className="lg:col-span-6 bg-white rounded-xl shadow p-6">
          <textarea
            name="content"
            value={updateItemData.content || ''}
            onChange={e => handleChange(e)}
            className="w-full h-64 border rounded-md p-2"
          />
        </div>
      </section>
    </div>

  )
}

export default ItemEdit