package com.kmong.template.backend.domain.item.service;

import com.kmong.template.backend.common.util.FileUploadUtil;
import com.kmong.template.backend.common.util.UploadPath;
import com.kmong.template.backend.domain.item.dto.ItemDTO;
import com.kmong.template.backend.domain.item.dto.ItemImageDTO;
import com.kmong.template.backend.domain.item.mapper.ItemMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ItemService {
  private final ItemMapper itemMapper;
  private final FileUploadUtil fileUploadUtil;

  /**
   * 등록 (이미지 포함)
   * @param mainImage 이미지 파일 배열
   * @param subImages 메인 이미지 인덱스 (0부터 시작, null이면 첫 번째)
   * @param dto Item 정보
   */
  @Transactional(rollbackFor = Exception.class)
  public void reg(MultipartFile mainImage, MultipartFile[] subImages, ItemDTO dto){
    // 1. 다음 ID 조회
    int nextId = itemMapper.getNextId();
    dto.setId(nextId);

    // 2. Item 저장
    itemMapper.reg(dto);
    log.info("Item 저장 완료: ID={}", nextId);

    // 3. 이미지 처리
    List<ItemImageDTO> imageList = new ArrayList<>();

    // 메인
    String[] mainFile = fileUploadUtil.uploadFile(mainImage, UploadPath.ITEM);
    imageList.add(ItemImageDTO.builder()
            .originImgName(mainFile[0])
            .attachedImgName(mainFile[1])
            .isMain("Y")
            .id(nextId)
            .build());

    // 서브
    if (subImages != null && subImages.length > 0) {
      List<String[]> subFiles = fileUploadUtil.uploadFiles(subImages, UploadPath.ITEM);
      for (String[] file : subFiles) {
        imageList.add(ItemImageDTO.builder()
                .originImgName(file[0])
                .attachedImgName(file[1])
                .isMain("N")
                .id(nextId)
                .build());
      }
    }

    itemMapper.regImages(imageList);  // List 전달
    log.info("이미지 {} 개 저장 완료", imageList.size());
  }

  // 목록 조회
  public List<ItemDTO> getAll(){
    return itemMapper.getAll();
  }

  // 상세 조회
  public ItemDTO get(int id){
    return itemMapper.get(id);
  }

  // 삭제
  @Transactional(rollbackFor = Exception.class)
  public void delete(int id){
    ItemDTO item = itemMapper.get(id);
    if (item == null) {
      throw new IllegalArgumentException("존재하지 않는 아이템입니다: " + id);
    }

    // 이미지 삭제
    List<ItemImageDTO> imageList = item.getImageList();
    if (imageList != null && !imageList.isEmpty()) {
      List<String> attachedImgNameList = imageList.stream()
              .map(ItemImageDTO::getAttachedImgName)
              .toList();
      fileUploadUtil.deleteFiles(attachedImgNameList, UploadPath.ITEM);
    }

    // 삭제
    itemMapper.delete(id);
  }

  // 수정
  @Transactional(rollbackFor = Exception.class)
  public void update(ItemDTO dto){
    itemMapper.update(dto);
  }
  
  // 목록 삭제
  @Transactional(rollbackFor = Exception.class)
  public int deleteList(int[] deleteIdArr){
    // 이미지 삭제 아이디 조회
    List<String> attachedImgNameList = itemMapper.getAttachedImgNameList(deleteIdArr);

    // 목록 삭제
    int deleteCnt = itemMapper.deleteList(deleteIdArr);

    // 이미지 삭제
    if (attachedImgNameList != null && !attachedImgNameList.isEmpty()) {
      fileUploadUtil.deleteFiles(attachedImgNameList, UploadPath.ITEM);
    }

    return deleteCnt;
  }
}
