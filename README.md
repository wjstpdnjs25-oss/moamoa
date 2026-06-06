# Moamoa

Moamoa는 사용자가 회원가입/로그인 후 지출을 기록하고, 월 예산과 소비 현황을 확인할 수 있는 모바일 가계부 앱입니다.  
프론트엔드는 Expo React Native 기반으로 구현되어 있으며, 백엔드는 Express와 SQLite를 사용합니다.

## 주요 기능

- 회원가입 및 로그인
- 지출 내역 입력 및 저장
- 월별 지출 내역 조회
- 소비 달력 확인
- 카테고리별 예산 설정
- 메인화면 예산 현황 확인
- 위시세이브 계획 저장 및 하루 예산 계산
- 예산 초과 시 알림 화면 표시

## 설치 방법

저장소를 clone합니다.

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

## 의존성

### 실행 환경

- OS: Windows 10/11, macOS, Linux
- Node.js: 20 LTS 이상 권장
- npm: 10 이상 권장
- 모바일 실행 환경: Expo Go
- 데이터베이스: SQLite

### Frontend

| Package | Version |
| --- | --- |
| expo | ~54.0.33 |
| react | 19.1.0 |
| react-native | 0.81.5 |
| expo-router | ~6.0.23 |
| expo-sqlite | ~16.0.10 |
| expo-constants | ~18.0.13 |
| expo-font | ~14.0.11 |
| expo-image | ~3.0.11 |
| expo-linking | ~8.0.11 |
| expo-status-bar | ~3.0.9 |
| @expo/vector-icons | ^15.0.3 |
| @react-navigation/native | ^7.1.8 |
| @react-navigation/bottom-tabs | ^7.4.0 |
| react-native-safe-area-context | ~5.6.0 |
| react-native-screens | ~4.16.0 |
| react-native-reanimated | ~4.1.1 |
| react-native-gesture-handler | ~2.28.0 |
| react-native-web | ~0.21.0 |
| typescript | ~5.9.2 |
| eslint | ^9.25.0 |
| eslint-config-expo | ~10.0.0 |

### Backend

| Package | Version |
| --- | --- |
| express | ^4.18.2 |
| cors | ^2.8.5 |
| sqlite3 | ^5.1.6 |
| nodemon | ^3.0.1 |

## 사용 방법

백엔드 서버를 먼저 실행합니다.

```bash
cd backend
npm start
```

백엔드 서버는 기본적으로 아래 주소에서 실행됩니다.

```text
http://localhost:4000
```

새 터미널을 열고 프로젝트 루트로 이동한 뒤 Expo 개발 서버를 실행합니다.

```bash
cd moamoa
npx expo start --clear
```

터미널에 표시되는 QR 코드를 Expo Go 앱으로 스캔하면 모바일 기기에서 앱을 실행할 수 있습니다.  
모바일 기기와 개발 PC는 같은 Wi-Fi에 연결되어 있어야 합니다.

연결이 잘 되지 않는 경우 tunnel 옵션으로 실행할 수 있습니다.

```bash
npx expo start --clear --tunnel
```

## 검증 방법

현재 프로젝트에는 Jest와 같은 별도 Unit Test 스크립트가 설정되어 있지 않습니다.  
따라서 clone 받은 저장소에서는 아래 명령어로 린트 검사와 백엔드 API 동작을 확인합니다.

프론트엔드 린트 검사를 실행합니다.

```bash
npm run lint
```

백엔드 서버 실행 여부를 확인합니다.

```bash
curl http://localhost:4000/
```

정상 응답 예시는 아래와 같습니다.

```json
{
  "status": "ok",
  "message": "Moamoa backend is running"
}
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

Windows PowerShell에서는 아래 명령어로 확인할 수 있습니다.

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
├── app
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── main.tsx
│   ├── login.tsx
│   ├── signup.tsx
│   ├── budget.tsx
│   ├── budget-alert.tsx
│   ├── calendar.tsx
│   ├── expense-input.tsx
│   └── wishsave.tsx
├── assets
│   └── images
├── backend
│   ├── database.js
│   ├── server.js
│   └── package.json
├── contexts
│   ├── BudgetContext.tsx
│   ├── BudgetAlertWatcher.tsx
│   ├── ExpenseContext.tsx
│   └── WishContext.tsx
├── src
│   ├── api
│   ├── components
│   ├── constants
│   ├── data
│   ├── features
│   ├── hooks
│   ├── types
│   └── utils
├── package.json
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

## 코딩 컨벤션

- TypeScript와 React Native 기반의 함수형 컴포넌트를 사용합니다.
- 화면 단위 코드는 `src/features` 아래에 작성합니다.
- 재사용 가능한 UI 컴포넌트는 `src/components` 아래에 작성합니다.
- Context 기반 전역 상태 관리는 `contexts` 폴더에서 관리합니다.
- 상수 값은 `src/constants`에 분리합니다.
- DB 접근 로직은 `src/data`에 분리합니다.
- 불필요한 UI 변경을 피하고, 기능 단위로 최소 범위만 수정합니다.
- 코드 수정 후 `npm run lint`를 실행해 기본 정적 검사를 확인합니다.

## 라이선스

이 프로젝트는 학습 및 팀 프로젝트 과제 제출을 목적으로 제작되었습니다.  
별도의 LICENSE 파일이 추가되기 전까지 소스 코드의 재배포 및 상업적 사용은 Contributor와 사전 협의가 필요합니다.

## Contributors

- 유서진: 접속화면, 회원가입, 로그인, 인증 화면 및 모바일 UI 구현, DB 연동 구현 
- 전세원: 지출 입력 화면, 예산 초과 알림 화면, 달력 화면 UI 구현, DB 연동 구현
- 정현주: 메인화면, 예산 설정 화면 구현
- 서은채: 위시세이브 화면 구현, 소비 비교화면 구현

## 참고 자료

- Expo SDK 54 Documentation: https://docs.expo.dev/versions/v54.0.0/
- Expo Router Documentation: https://docs.expo.dev/router/introduction/
- Expo SQLite Documentation: https://docs.expo.dev/versions/v54.0.0/sdk/sqlite/
- React Native Documentation: https://reactnative.dev/
- Express Documentation: https://expressjs.com/
- SQLite Documentation: https://www.sqlite.org/docs.html
