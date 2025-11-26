import React, { useState, useRef } from 'react'
import itemApi from '../apis/itemApi';

const ItemForm = () => {
  const [itemData, setItemData] = useState({ 
    title: '', 
    content: '' 
  });
  const [mainImage, setMainImage] = useState(null);
  const [subImages, setSubImages] = useState([]);

  // ref 추가
  const mainImageRef = useRef(null);
  const subImagesRef = useRef(null);

  const handleSubmit = async () => {
    // 유효성 검사
    if (!mainImage) {
      alert('메인 이미지는 필수입니다');
      return;
    }

    try {
      // API 함수 호출
      await itemApi.reg(mainImage, subImages, itemData);
      
      alert('등록 완료');
      
      // 초기화
      setMainImage(null);
      setSubImages([]);
      setItemData({ title: '', content: '' });

      // file input 초기화
      if (mainImageRef.current) mainImageRef.current.value = '';
      if (subImagesRef.current) subImagesRef.current.value = '';
    } catch (e) {
      if (typeof e.response?.data === 'object') {
        const messages = Object.values(e.response.data).join('\n');
        alert(messages);
      } else {
        alert(e.response?.data || e.message);
      }
    }
  };

  console.log(mainImage)
  console.log(itemData)

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">상품 등록</h2>

      {/* 제목 입력 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
        <input
          type="text"
          value={itemData.title}
          onChange={e => setItemData({
            ...itemData, 
            title: e.target.value
          })}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline focus:ring-2 focus:ring-indigo-500 focus:border-gray-300"
          placeholder="상품 제목을 입력하세요"
        />
      </div>

      {/* 내용 입력 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">내용</label>
        <textarea
          rows={5}
          value={itemData.content}
          onChange={e => setItemData({
            ...itemData, 
            content: e.target.value
          })}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline focus:ring-2 focus:ring-indigo-500 focus:border-gray-300"
          placeholder="상품 설명을 입력하세요"
        />
      </div>

      {/* 메인 이미지 업로드 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">메인 이미지</label>
        <input
          type="file"
          ref={mainImageRef}
          onChange={e => setMainImage(e.target.files[0])}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-indigo-50 file:text-indigo-700
                     hover:file:bg-indigo-100"
        />
      </div>

      {/* 서브 이미지 업로드 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">서브 이미지</label>
        <input
          type="file"
          multiple
          ref={subImagesRef}
          onChange={e => setSubImages([...e.target.files])}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-indigo-50 file:text-indigo-700
                     hover:file:bg-indigo-100"
        />
      </div>

      {/* 등록 버튼 */}
      <button
        onClick={handleSubmit}
        className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition-colors"
      >
        등록
      </button>
    </div>
  )
}

export default ItemForm