package com.kmong.template.backend.domain.item.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ItemDTO {
  private int id;               // 상품 아이디
  @NotBlank(message = "제목은 필수입니다.")
  @Size(max = 100, message = "제목은 100자 이하로 입력해야 합니다")
  private String title;         // 상품명
  @NotBlank(message = "상품 설명은 필수입니다.")
  @Size(max = 1000, message = "상품 설명은 1000자 이하로 입력해야 합니다")
  private String content;       // 상품 설명
  private LocalDateTime createdAt; // 등록일

  private List<ItemImageDTO> imageList; // 상품 이미지 목록

  private int[] deleteIdArr; // 상품 목록 삭제 아이디
}
