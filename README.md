# 크몽 템플릿 프로젝트 - 의뢰별 변경 가이드

## 📋 개요
이 템플릿은 소규모 CRUD 웹 애플리케이션을 빠르게 제작하기 위한 기본 구조입니다.
의뢰마다 아래 가이드에 따라 Item → Todo/Product/Post 등으로 변경하여 사용하세요.

---

## 🔄 변경 순서

### 1단계: Backend 변경

#### 1-1. 패키지명 변경 (IntelliJ)
1. `com.kmong.template` 우클릭
2. Refactor → Rename (Shift+F6)
3. `template` → `todo` (의뢰명으로 변경)
4. "Search in comments and strings" 체크
5. Refactor 클릭

#### 1-2. 도메인 폴더명 변경
1. `domain/item` 폴더 우클릭
2. Refactor → Rename
3. `item` → `todo`

#### 1-3. 클래스명 일괄 변경 (IntelliJ)
1. 프로젝트 전체 검색: Ctrl+Shift+R (Replace in Path)
2. Find: `Item` 
3. Replace: `Todo`
4. Scope: "In Project" 선택
5. 대소문자 구분 체크 (Match case)
6. Replace All 클릭

**자동 변경되는 파일들:**
- ItemController.java → TodoController.java
- ItemService.java → TodoService.java
- ItemMapper.java → TodoMapper.java
- ItemDTO.java → TodoDTO.java
- ItemImageDTO.java → TodoImageDTO.java

#### 1-4. Mapper XML 변경

**파일명 수동 변경:**
```
resources/mapper/item-mapper.xml 
→ resources/mapper/todo-mapper.xml
```

**XML 내부 수정:**
```xml
<!-- Before -->
<mapper namespace="com.kmong.template.backend.domain.item.mapper.ItemMapper">

<!-- After -->
<mapper namespace="com.kmong.todo.backend.domain.todo.mapper.TodoMapper">
```

**SQL 테이블명 변경:**
```xml
<!-- 모든 SQL 쿼리에서 테이블명 변경 -->
items → todos
item_images → todo_images
```

#### 1-5. schema.sql 변경
```sql
-- Before
CREATE TABLE items (
    id INT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content VARCHAR(1000) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE item_images (
    id SERIAL PRIMARY KEY,
    origin_img_name VARCHAR(100) NOT NULL,
    attached_img_name VARCHAR(100) NOT NULL,
    item_id INT REFERENCES items(id) ON DELETE CASCADE
);

-- After  
CREATE TABLE todos (
    id INT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content VARCHAR(1000) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE todo_images (
    id SERIAL PRIMARY KEY,
    origin_img_name VARCHAR(100) NOT NULL,
    attached_img_name VARCHAR(100) NOT NULL,
    todo_id INT REFERENCES todos(id) ON DELETE CASCADE
);
```

#### 1-6. API 경로 변경
`TodoController.java`에서:
```java
@RequestMapping("/items")  → @RequestMapping("/todos")
```

#### 1-7. application.properties 확인
```properties
# *.xml 와일드카드 패턴이면 변경 불필요
mybatis.mapper-locations=classpath:mapper/*.xml

# 특정 파일명을 지정했다면 변경 필요
mybatis.mapper-locations=classpath:mapper/todo-mapper.xml
```

---

### 2단계: Frontend 변경

#### 2-1. API 파일 변경
**파일명:**
```
src/api/itemApi.js → src/api/todoApi.js
```

**내부 URL 변경:**
```javascript
// Before
const API_URL = '/items';

// After
const API_URL = '/todos';

// 함수명도 변경
export const getItems = () => { ... }
→ export const getTodos = () => { ... }

export const createItem = (data) => { ... }
→ export const createTodo = (data) => { ... }
```

#### 2-2. 컴포넌트 파일명 변경
```
src/components/ItemList.jsx → TodoList.jsx
src/components/ItemForm.jsx → TodoForm.jsx
src/components/ItemCard.jsx → TodoCard.jsx
```

#### 2-3. 컴포넌트 내부 수정
**각 컴포넌트에서 import 변경:**
```jsx
// Before
import { getItems, createItem } from '../api/itemApi';

// After
import { getTodos, createTodo } from '../api/todoApi';
```

**컴포넌트명 변경:**
```jsx
// Before
function ItemList() { ... }
export default ItemList;

// After
function TodoList() { ... }
export default TodoList;
```

**API 호출 함수명 변경:**
```jsx
// Before
const items = await getItems();

// After
const todos = await getTodos();
```

#### 2-4. App.jsx 수정
```jsx
// Before
import ItemList from './components/ItemList';

// After
import TodoList from './components/TodoList';
```

---

### 3단계: 배포 환경변수 (Cloudtype)

Cloudtype 대시보드에서 필요시 환경변수 변경:
```bash
# Backend 서비스
PROJECT_NAME=kmong-template → kmong-todo

# Frontend 서비스
VITE_API_URL=https://your-backend-url/items 
→ VITE_API_URL=https://your-backend-url/todos
```

---

## ⏱️ 예상 소요 시간
```
Backend 변경: 10분
  - 패키지/클래스명 Refactor: 5분
  - XML/SQL 수정: 3분
  - API 경로 변경: 2분

Frontend 변경: 10분
  - 파일명 변경: 3분
  - import/함수 변경: 5분
  - 테스트: 2분

배포 및 테스트: 5분

총 소요 시간: 약 25분
```

---

## 🎯 변경 체크리스트

### Backend ✅
- [ ] 패키지명 변경 (com.kmong.template → com.kmong.todo)
- [ ] 도메인 폴더명 변경 (domain/item → domain/todo)
- [ ] Controller 클래스명 변경
- [ ] Service 클래스명 변경
- [ ] Mapper 인터페이스명 변경
- [ ] DTO 클래스명 변경 (ItemDTO, ItemImageDTO)
- [ ] Mapper XML 파일명 변경
- [ ] Mapper XML namespace 변경
- [ ] Mapper XML 쿼리 테이블명 변경
- [ ] schema.sql 테이블명 변경
- [ ] API 경로 변경 (@RequestMapping)

### Frontend ✅
- [ ] API 파일명 변경 (itemApi.js → todoApi.js)
- [ ] API URL 변경 (/items → /todos)
- [ ] API 함수명 변경 (getItems → getTodos)
- [ ] 컴포넌트 파일명 변경 (3개)
- [ ] 컴포넌트 내부 함수명 변경
- [ ] import 경로 변경
- [ ] App.jsx import 변경

### 배포 ✅
- [ ] Cloudtype Backend 환경변수 확인
- [ ] Cloudtype Frontend 환경변수 확인
- [ ] 로컬 테스트 (npm run dev)
- [ ] 배포 후 기능 테스트

---

## 💡 주요 변경 포인트 요약

### 꼭 변경해야 하는 것
```
1. 클래스명 (Item → Todo)
2. 테이블명 (items → todos, item_images → todo_images)
3. API 경로 (/items → /todos)
4. Mapper XML 파일명 및 namespace
5. Frontend API 파일 및 URL
```

### 선택적 변경
```
1. 프로젝트명 (backend → todo-backend)
2. 환경변수의 PROJECT_NAME
3. 변수명 (item → todo, items → todos)
```

---

## 🚨 주의사항

1. **Ctrl+Shift+R 사용 시**: "Match case" 옵션을 켜서 Item만 변경되도록 해야 합니다.
2. **외래키 컬럼명**: `item_id` → `todo_id`도 꼭 변경해야 합니다.
3. **Mapper XML**: namespace와 테이블명 모두 변경해야 합니다.
4. **Frontend**: API 함수명 변경을 놓치기 쉬우니 주의하세요.

---

## 🔧 문제 해결

### "No mapper found" 에러
→ Mapper XML의 namespace가 변경되었는지 확인

### 404 Not Found
→ Controller의 @RequestMapping 경로 확인
→ Frontend API URL 확인

### 테이블이 없다는 에러
→ schema.sql의 테이블명이 변경되었는지 확인

---

**변경 완료 후 반드시 로컬에서 테스트한 뒤 배포하세요!** 🚀
