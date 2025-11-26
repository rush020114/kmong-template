package com.kmong.template.backend.common.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
  // RuntimeException 처리 (입력 오류, 비즈니스 로직 오류)
  @ExceptionHandler(RuntimeException.class)
  public ResponseEntity<String> handleRuntimeException(RuntimeException e) {
    log.info("RuntimeException 발생 : {}", e.getMessage());
    return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(e.getMessage());
  }

  // 입력값 오류만 400으로 처리
  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException e) {
    log.info("IllegalArgumentException 발생 : {}", e.getMessage());
    return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(e.getMessage());
  }

  // 유효성 검사 실패 처리
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Map<String, String>> handleValidationException(
          MethodArgumentNotValidException e
  ) {
    Map<String, String> errors = new HashMap<>();

    e.getBindingResult().getFieldErrors().forEach(error ->
            errors.put(error.getField(), error.getDefaultMessage())
    );

    return ResponseEntity.badRequest().body(errors);
  }

}

