# Moamoa

Moamoa는 사용자가 예산과 지출을 관리하고, 달력에서 지출 내역을 확인하며,
위시세이브 목표를 계획할 수 있는 Expo React Native 애플리케이션입니다.

## 주요 기능

- 회원가입 및 로그인
- 카테고리별 예산 설정과 예산 초과 알림
- 지출 입력 및 SQLite 저장
- 월별 달력 지출 내역 확인
- 위시세이브 목표 및 하루 예산 계산
- 메인 화면 예산, 지출, 소비 비교 정보 제공

## 실행 환경

검증에 사용한 환경은 다음과 같습니다.

| 항목 | 버전 |
| --- | --- |
| OS | Windows 10/11, macOS, Linux |
| Node.js | 24.14.1 |
| npm | 11.11.0 |
| Expo CLI | 54.0.24 |
| Expo SDK | 54 |
| React | 19.1.0 |
| React Native | 0.81.5 |
| TypeScript | 5.9.x |
| Jest | 29.7.0 |

Node.js 20 LTS 이상과 npm 10 이상을 권장합니다. 모바일 기기에서 실행하려면
[Expo Go](https://expo.dev/go)가 필요합니다.

## 주요 의존성

| 패키지 | 버전 | 용도 |
| --- | --- | --- |
| [expo](https://github.com/expo/expo) | ~54.0.33 | Expo 개발 환경 |
| [expo-router](https://github.com/expo/router) | ~6.0.23 | 파일 기반 라우팅 |
| [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/) | ~16.0.10 | 앱 지출 데이터 저장 |
| [React Navigation](https://github.com/react-navigation/react-navigation) | 7.x | 화면 내비게이션 |
| [jest-expo](https://github.com/expo/expo/tree/main/packages/jest-expo) | ~54.0.17 | Expo Jest 프리셋 |
| [Testing Library React Native](https://github.com/callstack/react-native-testing-library) | ^14.0.0 | 컴포넌트 테스트 |
| [Express](https://github.com/expressjs/express) | ^4.18.2 | 백엔드 API |
| [node-sqlite3](https://github.com/TryGhost/node-sqlite3) | ^5.1.6 | 백엔드 SQLite 연동 |

외부 GitHub 패키지를 활용했습니다. 프로젝트에 도움을 준 패키지 저장소에도 관심과
Star를 부탁드립니다.

## 설치 방법

```bash
git clone https://github.com/wjstpdnjs25-oss/moamoa.git
cd moamoa
npm install
```

백엔드도 실행하려면 백엔드 의존성을 설치합니다.

```bash
cd backend
npm install
cd ..
```

## 사용 및 실행 방법

Expo 개발 서버를 실행합니다.

```bash
npm start
```

플랫폼별 실행 명령은 다음과 같습니다.

```bash
npm run android
npm run ios
npm run web
```

백엔드 서버를 실행하려면 별도 터미널에서 다음 명령을 사용합니다.

```bash
cd backend
npm start
```

기본 백엔드 주소는 `http://localhost:4000`입니다.

## Unit Test

Clone 받은 저장소에서 다음 순서로 Unit Test를 실행합니다.

```bash
npm install
npm test
```

현재 테스트는 Jest와 `jest-expo`를 사용하며, 앱 코드 import가 없는 Jest 환경 확인
테스트와 실제 `WishSaveCard.tsx` 컴포넌트 렌더 테스트를 포함합니다.

## Unit Test Coverage

파일별 coverage와 프로젝트 전체 Total coverage를 출력합니다.

```bash
npm run test:coverage -- --runInBand --coverageReporters=text --coverageReporters=text-summary
```

Jest에는 Python coverage의 `--source` 옵션이 없습니다. 이 프로젝트에서는 동등한
coverage 대상 지정 기능인 `collectCoverageFrom`을 `package.json`에 설정했습니다.

```json
"collectCoverageFrom": [
  "**/*.{ts,tsx}",
  "!**/node_modules/**",
  "!**/.expo/**",
  "!**/coverage/**",
  "!**/expo-env.d.ts"
]
```

따라서 위 명령은 프로젝트의 모든 TypeScript 프로그램 파일을 대상으로 파일별 결과와
전체 `All files` 및 `Coverage summary`를 출력합니다.

2026년 6월 6일 기준 결과:

| 항목 | Coverage |
| --- | ---: |
| Statements | 0.80% |
| Branches | 1.78% |
| Functions | 0.39% |
| Lines | 0.85% |
| `src/components/home/WishSaveCard.tsx` Statements/Functions/Lines | 100% |

## 기타 검증 명령

```bash
npm run lint
npx tsc --noEmit --rootDir .
```

## 프로젝트 구조

```text
moamoa/
├── app/          # Expo Router 라우트
├── assets/       # 이미지와 정적 자원
├── backend/      # Express 및 SQLite 백엔드
├── contexts/     # 앱 전역 상태
├── src/
│   ├── components/
│   ├── data/
│   ├── features/
│   └── hooks/
├── __tests__/    # Jest Unit Test
└── README.md
```

## Contributors

채점을 위한 Contributor Name과 Git/GitHub 식별 이름을 함께 기록합니다.

| 실명 | Git/GitHub 이름 | 담당 기능 |
| --- | --- | --- |
| 전세원 | `junsewon`, `wjstpdnjs25-oss` | 지출 입력, 예산 초과 알림, 달력, 데이터 연동 |
| 유서진 | `seojin113` | 시작 화면, 회원가입, 로그인 및 인증 화면 |
| 정현주 | `hyunju-chungbuk` | 메인 화면, 예산 설정, 설정 화면 |
| 서은채 | `eunchaeseo05` | 위시세이브, 소비 비교 화면 |

실명이 실제 팀 명단과 다르면 제출 전에 반드시 수정해야 합니다.

## License

이 프로젝트는 [MIT License](LICENSE)를 따릅니다.

## 참고 자료

- [Expo SDK 54 Documentation](https://docs.expo.dev/versions/v54.0.0/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [Express Documentation](https://expressjs.com/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
