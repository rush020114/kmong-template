package com.kmong.template.backend.common.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Component
public class FileUploadUtil {

  @Value("${file.upload.path}")
  private String uploadPath;

  /**
   * 단일 파일 업로드
   * @param img 업로드할 파일
   * @param uploadPath 업로드 경로 (Enum)
   * @return [원본파일명, 첨부파일명]
   */
  public String[] uploadFile(MultipartFile img, UploadPath uploadPath) {
    if (img == null || img.isEmpty()) {
      throw new IllegalArgumentException("업로드할 파일이 없습니다.");
    }

    log.info("업로드 이미지 : {}", img.getOriginalFilename());

    // ✅ NIO Path 사용 (현대적)
    // ✅ Paths.get과 Path API는 운영체제에 맞게 안전하고 유연하게 경로를 처리하기 위해 사용한다.
    // 결과: /var/www/uploads/test.png (Linux/Mac)
    // 결과: \var\www\\uploads\test.png (Windows)
    Path fullPath = Paths.get(this.uploadPath, uploadPath.getPath());

    // 폴더가 없으면 생성
    try {
      if (!Files.exists(fullPath)) {
        Files.createDirectories(fullPath);  // ✅ 권한 문제 대비
        log.info("업로드 폴더 생성 : {}", fullPath);
      }
    } catch (Exception e) {
      log.error("폴더 생성 실패 : {}", e.getMessage());
      throw new RuntimeException("폴더 생성 실패", e);
    }

    // UUID 파일명 생성
    String originName = img.getOriginalFilename();
    String extension = originName.substring(originName.lastIndexOf('.'));
    String attachedName = UUID.randomUUID().toString() + extension;

    // 파일 저장
    Path savePath = fullPath.resolve(attachedName);

    try {
      log.info("첨부파일명 : {}", attachedName);
      Files.copy(img.getInputStream(), savePath);  // ✅ NIO 사용

      // 파일 저장 확인
      if (!Files.exists(savePath) || Files.size(savePath) == 0) {
        throw new RuntimeException("파일 저장 실패: 파일이 비어있습니다.");
      }

      log.info("파일 저장 완료 : {}", savePath);
    } catch (Exception e) {
      log.error("파일 저장 실패 : {}", e.getMessage());
      throw new RuntimeException("파일 저장 실패: " + e.getMessage(), e);
    }

    return new String[] {originName, attachedName};
  }

  /**
   * 여러 파일 업로드
   * @param files 업로드할 파일 배열
   * @param uploadPath 업로드 경로 (Enum)
   * @return List<[원본파일명, 첨부파일명]>
   */
  public List<String[]> uploadFiles(MultipartFile[] files, UploadPath uploadPath) {
    if (files == null || files.length == 0) {
      throw new IllegalArgumentException("업로드할 파일이 없습니다.");
    }

    List<String[]> fileList = new ArrayList<>();
    for (MultipartFile file : files) {
      if (!file.isEmpty()) {  // ✅ 빈 파일 제외
        fileList.add(uploadFile(file, uploadPath));
      }
    }
    return fileList;
  }

  /**
   * 파일 삭제
   * @param attachedName 첨부파일명
   * @param uploadPath 업로드 경로 (Enum)
   */
  public void deleteFile(String attachedName, UploadPath uploadPath) {
    try {
      Path filePath = Paths.get(this.uploadPath, uploadPath.getPath(), attachedName);
      boolean deleted = Files.deleteIfExists(filePath);

      if (deleted) {
        log.info("파일 삭제 완료: {}", attachedName);
      } else {
        log.warn("삭제할 파일이 없음: {}", attachedName);
      }
    } catch (Exception e) {
      log.error("파일 삭제 실패: {}", e.getMessage());
      // ✅ 삭제 실패는 치명적이지 않으므로 예외 던지지 않음
    }
  }

  /**
   * 여러 파일 삭제
   * @param attachedNames 첨부파일명 리스트
   * @param uploadPath 업로드 경로 (Enum)
   */
  public void deleteFiles(List<String> attachedNames, UploadPath uploadPath) {
    if (attachedNames == null || attachedNames.isEmpty()) {
      return;
    }

    for (String attachedName : attachedNames) {
      deleteFile(attachedName, uploadPath);
    }
  }
}

