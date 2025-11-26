-- items
CREATE TABLE items (
    id INT PRIMARY KEY,                             -- 상품 아이디
    title VARCHAR(100) NOT NULL,                    -- 상품명
    content VARCHAR(1000) NOT NULL,                 -- 상품 설명
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- 등록일
);

-- item_images
CREATE TABLE item_images (
    image_id SERIAL PRIMARY KEY,                       -- 상품 이미지 아이디
    origin_img_name VARCHAR(100) NOT NULL,             -- 원본 파일명
    attached_img_name VARCHAR(100) NOT NULL,           -- 첨부 파일명
	is_main CHAR(1) NOT NULL,                          -- 메인 여부(Y/N)
    id INT REFERENCES items(id) ON DELETE CASCADE
);

select * from item_images;
