---
trigger: always_on
---

# 프로젝트 코드 스타일 가이드

## 전역 규칙

### 1. 코드 품질 원칙
- 모든 함수와 클래스는 명확한 목적을 가져야 합니다
- 하나의 함수는 하나의 책임만 가져야 합니다 (Single Responsibility Principle)
- 코드 중복을 최소화하고 재사용 가능한 함수로 분리하세요
- 매직 넘버 대신 명명된 상수를 사용하세요

### 2. 주석 작성 규칙
- 모든 공개(public) 함수와 클래스에는 한글 주석을 작성합니다
- 주석은 "무엇을"보다 "왜"를 설명합니다
- 복잡한 알고리즘이나 비즈니스 로직에는 상세한 설명을 추가합니다
- TODO, FIXME, NOTE 태그를 적절히 사용합니다

### 3. 네이밍 규칙
- 변수명과 함수명은 의미를 명확히 전달해야 합니다
- 약어 사용을 최소화하고, 사용할 경우 프로젝트 전체에서 일관되게 사용합니다
- 불린 변수는 `is`, `has`, `should` 등의 접두사를 사용합니다

---

## JavaScript/TypeScript 규칙

### 코드 스타일
- **들여쓰기**: 2칸 스페이스 사용
- **세미콜론**: 항상 사용
- **따옴표**: 문자열은 작은따옴표(') 또는 백틱(`) 사용
- **화살표 함수**: 가능한 경우 화살표 함수 사용

### 함수 작성
```javascript
/**
 * 사용자 데이터를 검증합니다
 * @param {Object} userData - 검증할 사용자 데이터
 * @returns {boolean} 검증 성공 여부
 */
const validateUserData = (userData) => {
  // 구현 내용
};
```

### 변수 선언
- `const`를 기본으로 사용하고, 재할당이 필요한 경우에만 `let` 사용
- `var`는 사용하지 않습니다

### 에러 처리
- 모든 비동기 함수는 try-catch로 에러를 처리합니다
- 에러 메시지는 한글로 작성하여 디버깅을 용이하게 합니다

---

## Python 규칙

### 코드 스타일
- **PEP 8** 스타일 가이드를 준수합니다
- **들여쓰기**: 4칸 스페이스 사용
- **최대 줄 길이**: 88자 (Black 포매터 기준)
- **따옴표**: 문자열은 큰따옴표(") 사용

### 함수 작성
```python
def calculate_average(numbers: list[float]) -> float:
    """
    숫자 리스트의 평균을 계산합니다.
    
    Args:
        numbers: 평균을 구할 숫자 리스트
        
    Returns:
        계산된 평균값
        
    Raises:
        ValueError: 빈 리스트가 입력된 경우
    """
    if not numbers:
        raise ValueError("빈 리스트는 처리할 수 없습니다")
    return sum(numbers) / len(numbers)
```

### Import 순서
1. 표준 라이브러리
2. 서드파티 라이브러리
3. 로컬 애플리케이션/라이브러리

각 그룹 사이에는 빈 줄을 추가합니다.

### Type Hints
- Python 3.10+ 기능을 활용하여 타입 힌트를 적극 사용합니다
- 모든 함수 매개변수와 반환값에 타입을 명시합니다

---

## Java 규칙

### 코드 스타일
- **들여쓰기**: 4칸 스페이스 사용
- **중괄호**: K&R 스타일 (여는 중괄호는 같은 줄)
- **최대 줄 길이**: 120자

### 클래스 및 메소드 작성
```java
/**
 * 사용자 정보를 관리하는 서비스 클래스
 * 
 * @author 작성자명
 * @version 1.0
 */
public class UserService {
    
    /**
     * 사용자 ID로 사용자 정보를 조회합니다
     * 
     * @param userId 조회할 사용자 ID
     * @return 사용자 정보 객체
     * @throws UserNotFoundException 사용자를 찾을 수 없는 경우
     */
    public User findUserById(Long userId) throws UserNotFoundException {
        // 구현 내용
    }
}
```

### 네이밍 규칙
- **클래스**: PascalCase (예: `UserService`)
- **메소드/변수**: camelCase (예: `findUserById`)
- **상수**: UPPER_SNAKE_CASE (예: `MAX_RETRY_COUNT`)
- **패키지**: lowercase (예: `com.example.service`)

---

## React 규칙

### 컴포넌트 구조
- 함수형 컴포넌트를 기본으로 사용합니다
- Hooks를 활용하여 상태 관리를 합니다
- 컴포넌트는 하나의 파일에 하나만 작성합니다

### 파일 구조
```
ComponentName/
  ├── index.tsx          # 컴포넌트 메인 파일
  ├── ComponentName.tsx  # 컴포넌트 구현
  ├── styles.module.css  # 스타일 파일
  └── types.ts           # 타입 정의
```

### Props 타입 정의
```typescript
interface UserCardProps {
  /** 사용자 ID */
  userId: string;
  /** 사용자 이름 */
  userName: string;
  /** 클릭 이벤트 핸들러 */
  onClick?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ userId, userName, onClick }) => {
  // 구현 내용
};
```

---

## Git Commit 메시지 규칙

### 커밋 메시지 형식
```
<타입>: <제목>

<본문>

<푸터>
```

### 타입 종류
- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅, 세미콜론 누락 등
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드 추가/수정
- `chore`: 빌드 업무 수정, 패키지 관리

### 예시
```
feat: 사용자 로그인 기능 추가

- JWT 기반 인증 구현
- 로그인 API 엔드포인트 추가
- 세션 관리 로직 구현

Resolves: #123
```

---

## 테스트 코드 규칙

### 테스트 파일 위치
- 테스트 파일은 `__tests__` 폴더 또는 소스 파일과 같은 위치에 배치
- 파일명: `*.test.js`, `*.test.ts`, `*.spec.py` 형식 사용

### 테스트 작성 원칙
- AAA 패턴 사용: Arrange(준비) - Act(실행) - Assert(검증)
- 하나의 테스트는 하나의 기능만 검증합니다
- 테스트명은 한글로 작성하여 의도를 명확히 합니다

### 예시 (Jest)
```javascript
describe('사용자 서비스', () => {
  test('유효한 사용자 ID로 조회 시 사용자 정보를 반환한다', () => {
    // Arrange
    const userId = '123';
    
    // Act
    const result = userService.findById(userId);
    
    // Assert
    expect(result).toBeDefined();
    expect(result.id).toBe(userId);
  });
});
```

---

## 보안 규칙

### 절대 금지 사항
- API 키, 비밀번호 등 민감 정보를 코드에 하드코딩하지 않습니다
- `.env` 파일을 git에 커밋하지 않습니다 (`.gitignore`에 추가)
- 사용자 입력값은 항상 검증하고 sanitize합니다

### 환경 변수 사용
```javascript
// ❌ 나쁜 예
const apiKey = 'sk-1234567890abcdef';

// ✅ 좋은 예
const apiKey = process.env.API_KEY;
```

---

## 성능 최적화 규칙

### JavaScript/React
- 불필요한 리렌더링을 방지하기 위해 `React.memo`, `useMemo`, `useCallback` 사용
- 큰 리스트는 가상화(virtualization) 적용
- 이미지는 최적화하여 사용 (WebP, lazy loading)

### Python
- 리스트 컴프리헨션을 적절히 활용합니다
- 큰 데이터셋은 generator를 사용하여 메모리 효율을 높입니다
- 반복문 내에서 불필요한 함수 호출을 피합니다

---

## 접근성(Accessibility) 규칙

### HTML/React
- 모든 이미지에 `alt` 속성을 추가합니다
- 시맨틱 HTML 태그를 사용합니다 (`<header>`, `<nav>`, `<main>`, `<footer>`)
- 키보드 네비게이션을 지원합니다
- ARIA 속성을 적절히 사용합니다

---

## 코드 리뷰 체크리스트

코드를 생성한 후 다음 항목을 자동으로 검증하세요:

- [ ] 코드 스타일 가이드를 준수했는가?
- [ ] 모든 함수에 적절한 주석이 있는가?
- [ ] 에러 처리가 적절히 되어 있는가?
- [ ] 테스트 코드가 작성되었는가?
- [ ] 보안 취약점이 없는가?
- [ ] 성능 이슈가 없는가?
- [ ] 접근성을 고려했는가?