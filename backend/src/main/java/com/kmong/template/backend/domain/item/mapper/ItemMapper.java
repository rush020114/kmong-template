package com.kmong.template.backend.domain.item.mapper;

import com.kmong.template.backend.domain.item.dto.ItemDTO;
import com.kmong.template.backend.domain.item.dto.ItemImageDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ItemMapper {
  // 다음 id 조회
  int getNextId();

  // 등록
  void reg(ItemDTO dto);

  // 이미지 등록
  void regImages(List<ItemImageDTO> imageList);

  // 목록 조회
  List<ItemDTO> getAll();

  // 상세 조회
  ItemDTO get(int id);

  // 삭제
  void delete(int id);

  // 수정
  void update(ItemDTO dto);
}
