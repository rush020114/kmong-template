import React, { useEffect, useRef, useState } from 'react'
import itemApi from '../apis/itemApi';
import ItemCard from '../components/ItemCard';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../utils/errorHandler';

const ItemList = () => {

  const nav = useNavigate();

  const [reload, setReload] = useState(0);

  // 체크된 아이디를 저장할 state 변수
  const [checkedItems, setCheckedItems] = useState([]);

  // 전체 체크박스를 저장할 useRef
  const checkedAll = useRef([]);

  // 목록 삭제 여부를 판단할 state 변수
  const [isDelete, setIsDelete] = useState(false);

  // 조회한 목록을 저장할 state 변수
  const [itemList, setItemList] = useState([]);

  // 목록을 조회할 useEffect
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await itemApi.getAll();
        setItemList(res);
        checkedAll.current = res.map(d => d.id);
      } catch (e) {
        handleError(e, false);
      }
    }
    fetchItems();
  }, [reload]);

  // 개별 체크박스 클릭 시 실행 함수
  const checkItem = e => {
    if(e.target.checked){
      setCheckedItems([
        ...checkedItems
        , parseInt(e.target.value)
      ])
    } else {
      setCheckedItems(checkedItems.filter(item => item !== parseInt(e.target.value)));
    }
  };

  // 전체 체크박스 체크 시 실행 함수
  const checkAll = e => {
    setCheckedItems(e.target.checked ? checkedAll.current : []);
  }

  // 게시글 목록 삭제
  const deleteList = async idList => {
    if(!idList || idList.length === 0){
      alert("삭제할 목록을 선택해주세요.");
      return;
    }
    if(!confirm("삭제하시겠습니까?")){
      return;
    }
    try{
      const res = await itemApi.deleteList(idList);
      setReload(prev => prev + 1);
      alert(res);
      setCheckedItems([]);
    } catch(e){
      handleError(e, true)
    }
  }

  console.log(checkedItems)
  console.log(checkedAll)

  return (
    <div>
      <div className="mb-6 flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">아이템 목록</h2>
        
        {isDelete ? (
          <div className="flex items-center gap-2">
            <label className="flex h-9 items-center gap-1.5 rounded-md bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700 cursor-pointer">
              <input 
                type="checkbox"
                className="h-4 w-4 rounded border-white"
                checked={checkedAll.current.length === checkedItems.length}
                onChange={e => checkAll(e)}
              />
              <span>전체</span>
            </label>
            <button 
              onClick={() => setIsDelete(false)}
              className="flex h-9 items-center gap-1.5 rounded-md bg-gray-500 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-600 active:bg-gray-400"
            >
              <i className="bi bi-x-lg"></i>
              <span>취소</span>
            </button>
            <button 
              className="flex h-9 items-center gap-1.5 rounded-md bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-700 active:bg-red-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
              onClick={() => deleteList(checkedItems)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setIsDelete(true)}
            className="flex h-9 items-center gap-1.5 rounded-md bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-700 active:bg-red-500"
          >
            <i className="bi bi-trash"></i>
            <span>선택</span>
          </button>
        )}
      </div>
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
              onClick={() => {
                if(isDelete){
                  
                } else {
                  nav(`${item.id}`);
                }
              }}
              key={item.id}
              item={item}
              isDelete={isDelete}
              checkItem={checkItem}
              checkedItems={checkedItems}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ItemList