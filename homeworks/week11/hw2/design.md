## 網站路由規劃

### 頁面

- index.php 首頁
- about.php 關於我
- login.php 登入頁面
- admin.php 後台頁面
- post.php?id=1 單篇文章頁面
- add_post.php 新增文章頁面
- update_post.php 編輯文章頁面


### 邏輯處理

- handle_login.php 登入處理
- handle_add_post.php 新增文章處理
- handle_update.php 編輯文章處理
- handle_delete.php 刪除文章處理


## 版面規劃


### 首頁 / 單篇文章 / 關於我

- 導覽列 (文章列表、文章分類、關於我、登入、後台)
- banner 顯示標題
- 內容


### 新增 / 編輯文章（表單）

- 標題
- 內容
- 分類


### 管理後台

- 顯示所有文章，文章旁邊有編輯跟刪除按鈕
- 新增文章按鈕
- 管理分類按鈕

## 資料結構

### users

- id 
- username 帳號
- password 密碼
- created_at 創建日期


### posts 

- id
- title 標題
- category_id 分類編號
- content 內容
- created_at 發佈日期
- is_deleted 刪除狀態


### categories

- id
- name 分類名稱