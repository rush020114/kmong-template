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
    <div className="space-y-5">
      {/* 상단: 제목/작성일 */}
      <header className="rounded-lg bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          {/* 왼쪽: 제목 + 작성일 */}
          <div className="min-w-0 flex-1">
            <h1 className="break-words text-2xl font-bold text-gray-900">{itemDetail.title}</h1>
            {itemDetail.createdAt && (
              <p className="mt-2 text-sm text-gray-500">
                {new Date(itemDetail.createdAt).toLocaleDateString('ko-KR')}
              </p>
            )}
          </div>

          {/* 오른쪽: 수정/삭제 아이콘 */}
          <div className="flex shrink-0 gap-2">
            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
              aria-label="수정"
              onClick={() => nav(`/edit/${id}`)}
            >
              <i className="bi bi-pencil text-lg"></i>
            </button>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
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
              <i className="bi bi-trash text-lg"></i>
            </button>
          </div>
        </div>
      </header>

      {/* 중단: 메인 이미지 + 내용 */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* 메인 이미지 (배열 0번째) */}
        <div className="overflow-hidden rounded-lg bg-white p-6 shadow-sm">
          {itemDetail.imageList?.[0] ? (
            <img
              src={`${import.meta.env.VITE_API_URL}/uploads/item/${itemDetail.imageList[0].attachedImgName}`}
              alt={itemDetail.imageList[0].originImgName}
              className="w-full rounded object-contain"
            />
          ) : (
            <div className="flex aspect-square items-center justify-center bg-gray-100 text-gray-400">
              <i className="bi bi-image text-6xl"></i>
            </div>
          )}
        </div>

        {/* 내용 */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          {itemDetail.content ? (
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
              {itemDetail.content}
            </div>
          ) : (
            <p className="text-gray-400">내용이 없습니다.</p>
          )}
        </div>
      </div>

      {/* 하단: 서브 이미지 갤러리 */}
      {itemDetail.imageList?.length > 1 && (
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-base font-semibold text-gray-900">추가 이미지</h2>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {itemDetail.imageList?.slice(1).map((img) => (
              <div 
                key={img.imageId}
                className="group aspect-square overflow-hidden rounded-lg bg-gray-100"
              >
                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/item/${img.attachedImgName}`}
                  alt={img.originImgName}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>

  )
}

export default ItemDetail