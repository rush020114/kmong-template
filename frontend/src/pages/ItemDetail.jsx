import React, { useEffect, useState } from 'react'
import itemApi from '../apis/itemApi';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { handleError } from '../utils/errorHandler';

const ItemDetail = () => {

  const nav = useNavigate();

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
        handleError(e, false);
      }
    }
    fetchItems();
  }, []);

  console.log(itemDetail)

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col gap-6">
      {/* 상단: 제목/작성일 */}
      <header className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
        {/* 왼쪽: 제목 + 작성일 */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{itemDetail.title}</h1>
          {itemDetail.createdAt && (
            <p className="text-sm text-gray-500 mt-1">
              {new Date(itemDetail.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* 오른쪽: 수정/삭제 아이콘 */}
        <div className="flex gap-4 text-gray-500">
          <button
            className="hover:text-indigo-600 transition-colors"
            aria-label="수정"
            onClick={() => console.log('수정 클릭')}
          >
            <i className="bi bi-pencil-square text-xl"></i>
          </button>
          <button
            className="hover:text-red-600 transition-colors"
            aria-label="삭제"
            onClick={async () => {
              if(!confirm('삭제하시겠습니까?')) return;
              try {
                const res = await itemApi.delete(id);
                alert(res);
                nav('/');
              } catch (e) {
                handleError(e, true);
              }
            }}
          >
            <i className="bi bi-trash text-xl"></i>
          </button>
        </div>
      </header>

      {/* 중단: 메인 이미지 + 내용 */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 메인 이미지 (배열 0번째) */}
        <div className="lg:col-span-6 bg-white rounded-xl shadow p-6 flex items-center justify-center">
          {itemDetail.imageList?.[0] && (
            <img
              src={`${import.meta.env.VITE_API_URL}/uploads/item/${itemDetail.imageList[0].attachedImgName}`}
              alt={itemDetail.imageList[0].originImgName}
              className="max-h-[480px] w-full object-contain"
            />
          )}
        </div>

        {/* 내용 */}
        <div className="lg:col-span-6 bg-white rounded-xl shadow p-6">
          {itemDetail.content && (
            <div className="prose max-w-none text-gray-700 whitespace-pre-line leading-relaxed">
              {itemDetail.content}
            </div>
          )}
        </div>
      </section>

      {/* 하단: 서브 이미지 갤러리 */}
      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">이미지 상세</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {itemDetail.imageList?.slice(1).map((img) => (
            <img
              key={img.imageId}
              src={`${import.meta.env.VITE_API_URL}/uploads/item/${img.attachedImgName}`}
              alt={img.originImgName}
              className="w-full h-28 object-cover rounded-md border border-gray-200 hover:border-indigo-400 transition"
            />
          ))}
        </div>
      </section>
    </div>

  )
}

export default ItemDetail