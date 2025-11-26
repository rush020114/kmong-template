package com.kmong.template.backend.domain.item.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ItemImageDTO {
  private int imageId;           // 상품 이미지 아이디
  private String originImgName;  // 원본 파일명
  private String attachedImgName;// 첨부 파일명
  private String isMain;         // 메인 여부 (Y/N)
  private int id;            // 상품 아이디 (FK)
}
