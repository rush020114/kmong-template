package com.kmong.template.backend.domain.item.controller;

import com.kmong.template.backend.domain.item.dto.ItemDTO;
import com.kmong.template.backend.domain.item.service.ItemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("items")
@RequiredArgsConstructor
public class ItemController {
  private final ItemService itemService;

  /**
   * Item 등록 (이미지 포함)
   * @param mainImage 메인 이미지
   * @param subImages 서브 이미지 배열
   * @param dto Item 정보
   */
  @PostMapping("")
  public ResponseEntity<String> reg(
          @RequestPart MultipartFile mainImage,
          @RequestPart(required = false) MultipartFile[] subImages,
          @RequestPart @Valid ItemDTO dto
  ) {
    itemService.reg(mainImage, subImages, dto);
    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body("등록 완료");
  }

  // 목록 조회
  @GetMapping("")
  public ResponseEntity<List<ItemDTO>> getAll(){
    return ResponseEntity
            .status(HttpStatus.OK)
            .body(itemService.getAll());
  }

  // 상세 조회
  @GetMapping("/{id}")
  public ResponseEntity<ItemDTO> get(@PathVariable("id") int id){
    return ResponseEntity
            .status(HttpStatus.OK)
            .body(itemService.get(id));
  }

  // 삭제
  @DeleteMapping("/{id}")
  public ResponseEntity<String> delete(@PathVariable("id") int id){
    itemService.delete(id);
    return ResponseEntity
            .status(HttpStatus.OK)
            .body("삭제 완료");
  }

  // 수정
  @PutMapping("/{id}")
  public ResponseEntity<String> update(
          @PathVariable("id") int id,
          @RequestBody ItemDTO dto
  ){
    dto.setId(id);
    itemService.update(dto);
    return ResponseEntity
            .status(HttpStatus.OK)
            .body("수정 완료");
  }
}
