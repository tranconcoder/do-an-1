# Những kiến thức đạt được trong quá trình làm dự án

## 1. Những packages cần thiết

### Nhóm trợ dev thuận tiện

1. Morgan: Logger trên terminal
2. Nodemon: lắng nghe và reload máy chủ (không cần nếu dùng tsx, node bản mới)
3. Tsx (typescript excute): hỗ trợ auto compile typescript code và tích hợp giống nodemon
4. Http status codes: cung cấp các thông tin có sẵn về http status code

### Server core

1. Express: framework chính hỗ trợ phát triển routing cho máy chủ
2. Compression: hỗ trợ nén dữ liệu trong quá trình truyền
3. Helmet: bảo mật cho máy chủ
4. PM2: hỗ trợ quản lý máy chủ trong môi trường production
5. Winston: hệ thống logger file, hỗ trợ nhiều mức độ log
6. Winston daily rotate file: logge file theo ngày, tuần, tháng, năm
7. Json web token: token hỗ trợ xác thực và phân quyền
8. Mongoose, mongodb: cơ sở dữ liệu NoSQL

### Nhóm công cụ phát triển

1. Cron: tạo luồng child_process và xử lý tác vụ lập lịch đã lập
2. Dotenv: ẩn thông tin nhạy cảm trong source code
3. Joi: validate dữ liệu trước khi xử lý
4. Joi extract type: lấy type của schema đã tạo trong typescript
5. Lodash: công cụ tương tác object, array
6. UUID: tạo uuid ngẫu nhiên cho hệ thống.

## 2. Cấu trúc dự án

📦 Root

├── 📂 logs/ # Application logs directory

├── 📂 build/ # Compiled TypeScript output

├── 📂 src/

│ ├── 📂 apps/ # Application initialization

│ └── 📂 api/

│ ├── 📂 services/ # Business logic layer

│ ├── 📂 controllers/ # Request handlers

│ ├── 📂 middlewares/ # Express middleware functions

│ ├── 📂 models/ # Database models

│ ├── 📂 routes/ # API route definitions

│ ├── 📂 utils/ # Utility functions

│ ├── 📂 helpers/ # Helper functions

│ ├── 📂 types/ # TypeScript type definitions

│ └── 📂 validations/ # Request validation schemas

├── 📂 configs/ # Configuration files

├── 📄 .env.development.local # Development environment variables

├── 📄 .env.production.local # Production environment variables

├── 📄 server.ts # Application entry point

└── 📄 .gitignore # Git ignore rules
