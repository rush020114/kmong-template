package com.kmong.template.backend.domain.item.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ItemDTO {
  private int id;               // 상품 아이디
  private String title;         // 상품명
  private String content;       // 상품 설명
  private LocalDateTime createdAt; // 등록일

  private List<ItemImageDTO> ImageList;
}
