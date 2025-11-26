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
  @Transactional
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
}
