package com.kmong.template.backend.common.util;

/**
 * 파일 업로드 경로 Enum
 * 의뢰마다 추가 가능 (예: TODO, PRODUCT, BOARD 등)
 */
public enum UploadPath {

  ITEM("item");  // ✅ 템플릿용 기본 경로

  private final String path;

  UploadPath(String path) {
    this.path = path;
  }

  public String getPath() {
    return this.path;
  }
}