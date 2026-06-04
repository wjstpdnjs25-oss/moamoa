# Moamoa

Moamoa는 사용자가 회원가입/로그인 후 지출을 입력하고, 월 예산과 소비 현황을 확인할 수 있는 모바일 가계부 앱입니다. 프론트엔드는 Expo React Native로 구현되어 있으며, 백엔드는 Express와 SQLite를 사용해 회원 정보를 저장합니다.

## 주요 기능

- 회원가입 및 로그인
- SQLite 기반 사용자 계정 저장
- 메인 화면에서 잔액, 월 지출, 예산 상태 확인
- 빠른 지출 입력
- 카테고리별 지출 입력
- 소비 달력 화면
- 예산 초과 알림 화면

## 실행 환경

- OS: Windows 10/11, macOS, Linux
- Node.js: 20 LTS 이상 권장
- npm: 10 이상 권장
- 모바일 실행: Expo Go 앱
- 백엔드 DB: SQLite

## 의존성

### Frontend

| Package | Version |
| --- | --- |
| expo | ~54.0.33 |
| react | 19.1.0 |
| react-native | 0.81.5 |
| expo-router | ~6.0.23 |
| expo-constants | ~18.0.13 |
| @expo/vector-icons | ^15.0.3 |
| @react-navigation/native | ^7.1.8 |
| react-native-safe-area-context | ~5.6.0 |
| react-native-screens | ~4.16.0 |
| typescript | ~5.9.2 |
| eslint-config-expo | ~10.0.0 |

### Backend

| Package | Version |
| --- | --- |
| express | ^4.18.2 |
| cors | ^2.8.5 |
| sqlite3 | ^5.1.6 |
| nodemon | ^3.0.1 |

## 설치 방법

```bash
git clone https://github.com/wjstpdnjs25-oss/moamoa.git
cd moamoa
```

프론트엔드 의존성을 설치합니다.

```bash
npm install
```

백엔드 의존성을 설치합니다.

```bash
cd backend
npm install
cd ..
```

## 사용 방법

백엔드 서버를 먼저 실행합니다.

```bash
cd backend
npm start
```

서버가 정상 실행되면 기본 주소는 아래와 같습니다.

```text
http://localhost:4000
```

새 터미널을 열고 Expo 개발 서버를 실행합니다.

```bash
cd moamoa
npx expo start --lan
```

터미널에 표시되는 QR 코드를 Expo Go 앱으로 스캔하면 모바일 기기에서 앱을 확인할 수 있습니다. 모바일 기기와 개발 PC는 같은 Wi-Fi에 연결되어 있어야 합니다.

## Unit Test 및 검증 방법

현재 프로젝트에는 Jest 같은 별도 Unit Test 프레임워크가 추가되어 있지 않습니다. 대신 clone 받은 저장소에서 아래 명령어로 타입 검사, 린트 검사, 백엔드 API 동작 검증을 수행합니다.

프론트엔드 타입 검사를 실행합니다.

```bash
npx tsc --noEmit
```

프론트엔드 린트 검사를 실행합니다.

```bash
npm run lint
```

백엔드 서버 상태를 확인합니다.

```bash
curl http://localhost:4000/
```

회원가입 API를 확인합니다.

```bash
curl -X POST http://localhost:4000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"test1234\",\"nickname\":\"testuser\"}"
```

로그인 API를 확인합니다.

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"identifier\":\"testuser\",\"password\":\"test1234\"}"
```

Windows PowerShell에서는 아래처럼 실행할 수 있습니다.

```powershell
Invoke-RestMethod http://localhost:4000/
```

```powershell
Invoke-RestMethod -Method Post -Uri http://localhost:4000/api/auth/signup -ContentType 'application/json' -Body '{"email":"test@example.com","password":"test1234","nickname":"testuser"}'
```

```powershell
Invoke-RestMethod -Method Post -Uri http://localhost:4000/api/auth/login -ContentType 'application/json' -Body '{"identifier":"testuser","password":"test1234"}'
```

## 프로젝트 구조

```text
moamoa
├── app                 # Expo Router 라우트
├── assets              # 이미지 및 앱 아이콘
├── backend             # Express, SQLite 백엔드
│   ├── database.js     # SQLite 테이블 생성 및 DB 연결
│   └── server.js       # REST API 서버
├── src
│   ├── api             # API client
│   ├── components      # 공통 UI 컴포넌트
│   └── features        # 화면별 기능 모듈
└── README.md
```

## API 요약

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/` | 백엔드 서버 상태 확인 |
| POST | `/api/auth/signup` | 회원가입 |
| POST | `/api/auth/login` | 로그인 |
| POST | `/api/expenses` | 지출 저장 |
| GET | `/api/expenses` | 전체 지출 조회 |
| GET | `/api/expenses/month/:month` | 월별 지출 조회 |
| POST | `/api/budgets` | 예산 저장 |
| GET | `/api/budgets/:month` | 월별 예산 조회 |

## 라이선스

이 프로젝트는 학습 및 과제 제출 목적의 프로젝트입니다. 별도의 LICENSE 파일이 추가되기 전까지 소스 코드의 재배포 및 상업적 사용은 Contributor와 사전 협의가 필요합니다.

## Contributors

- 유서진: 접속화면, 회원가입, 로그인, 인증 화면 및 모바일 UI 구현
- 전세원: 사용 금액 입력 화면, 예산 초과 알림 화면, 달력 화면 UI 구현
- 정현주: 메인화면, 예산 설정 화면, 설정탭 구현
- 서은채: 위시세이브 화면 구현, 소비 비교화면 구현 
## 참고 자료

- Expo SDK 54 Documentation: https://docs.expo.dev/versions/v54.0.0/
- Expo Router Documentation: https://docs.expo.dev/router/introduction/
- Express Documentation: https://expressjs.com/
- SQLite Documentation: https://www.sqlite.org/docs.html
