배포까지 성공하신 **SSUP** 프로젝트의 `README.md` 초안을 작성해 드립니다.

이 파일은 프로젝트의 얼굴과 같으니, 나중에 포트폴리오로 활용하실 때 큰 도움이 될 거예요. 프로젝트의 핵심 기술 스택과 현재 배포 환경(AWS)을 중심으로 정리했습니다.

---

# 🚀 SSUP (쑥업) - 지역 기반 모임 플랫폼

> **관심사 기반으로 오프라인 모임을 개설하고 참여할 수 있는 웹 서비스입니다.** > 사용자의 위치를 기반으로 모임 정보를 제공하며, 간편한 참여 관리 기능을 제공합니다.

---

## 🛠 Tech Stack

### **Frontend**

* **Framework**: React (Vite)
* **State Management**: Hooks / Context API
* **API Client**: Axios
* **Design**: HTML5, CSS3

### **Backend**

* **Language**: Java 17
* **Framework**: Spring Boot 3.x / 4.x
* **Security**: Spring Security (JWT / Session)
* **ORM**: Spring Data JPA (Hibernate 7)
* **Build Tool**: Gradle

### **Infrastructure & Database**

* **Database**: AWS RDS (MySQL 8.0)
* **Server**: AWS EC2 (Ubuntu 22.04 LTS)
* **Web Server**: Nginx (Reverse Proxy)
* **Storage**: Local Storage (for Image Uploads)

---

## ✨ Key Features

* **회원 관리**: 회원가입 및 로그인, 사용자 프로필 관리
* **모임 관리**: 모임 개설, 상세 정보 조회, 카테고리별 필터링
* **인기 모임**: 조회수 기반 'Hot' 모임 추천
* **지도 서비스**: 카카오 맵 API를 활용한 모임 장소 시각화
* **이미지 업로드**: 모임 및 프로필 이미지 업로드 기능

---

## 🏗 System Architecture

1. **Nginx**: 80 포트(HTTP)로 들어오는 요청을 받아 정적 파일(`dist`)을 서빙하거나, `/api` 요청을 백엔드로 포워딩합니다.
2. **Spring Boot**: 비즈니스 로직을 처리하며 8080 포트에서 구동됩니다.
3. **MySQL (RDS)**: 모든 데이터(사용자, 모임, 참여 정보)를 안전하게 관리합니다.

---

## ⚙️ Environment Setup

### **Backend Configuration**

`src/main/resources/application.properties` (또는 외부 설정 파일)

```properties
spring.datasource.url=jdbc:mysql://[RDS-ENDPOINT]:3306/ssup
spring.datasource.username=admin
spring.datasource.password=[PASSWORD]
spring.jpa.hibernate.ddl-auto=update
file.upload-dir=/home/ubuntu/uploads/

```

### **Nginx Configuration**

```nginx
location / {
    root /home/ubuntu/dist;
    try_files $uri $uri/ /index.html;
}

location /api/ {
    proxy_pass http://localhost:8080/;
    proxy_set_header Host $host;
}

```

---

## 🚀 Deployment

### **Backend**

```bash
./gradlew clean build -x test
nohup java -jar app.jar --spring.config.location=file:/home/ubuntu/application.properties > nohup.out 2>&1 &

```

### **Frontend**

```bash
npm run build
# 생성된 dist 폴더를 서버의 /home/ubuntu/로 전송

```

---

## 📂 Project Structure

```text
ssup/
├── backend/
│   ├── src/main/java/sdn/backend/  # Spring Boot Source
│   └── build.gradle                # Dependencies
├── frontend/
│   ├── src/                        # React Source
│   ├── public/                     # Static Assets
│   └── vite.config.js              # Build Config
└── README.md

```
