# 작동환경
    - type3
        - 서비스 2개가 가동
        - react + ts|js + next.js <->springboot(restapi 역할, 미들웨어역할)
        - CSR
        - next.js가 SSR SSG ISR처리

# 작동 프로그램
    - oracle , sql developer
    - STS
    - VSCODE

# 작동 시스템 버전
    - node ver v20.17.0
    - next.js ver 14.2.13
    - typescript
    - java 17
    - spring boot 3.3.4
    - oracle 18c

# 시스템별 역할

    ## Spring Boot

        - restAPI
            - restAPI Controller

        - 로그인
            - 스프링 시큐리티

        - 로그인 및 DB와 연결위한 SpringBoot 구성
            - Config
                - JwtProperties
                - SecurityConfig
                - TokenAuthenticationFilter
                - LoginResponse // 로그인 정보
                - WebConfig // CORS 설정
            - Service
                - 로그인관련                     
                    - SpmallUserService
                    - TokenService
                    - SecurityService
                    - UtilService
                    - TokenProvider
                - 주소관련
                    - SpmallAddressService
                - 상품관련 
                    - SpmallProductService
                - 카트관련 
                    - SpmallCartService
                - 주문관련 
                    - SpmallOrderRepository
                - 상품리뷰 
                    - SpmallProReviewService
                    - SpmallProUserService 구매시 상품 구매자리스트에 넣어 상품 리뷰를 달 수 있는 권한 주기 위함

            - Repository
                - 로그인관련 
                    - SpmallUserRepository
                    - RefreshTokenRepository
                - 주소관련
                    - SpmallAddressRepository
                - 상품관련 
                    - SpmallProductRepository
                - 카트관련 
                    - SpmallCartRepository
                - 주문관련 
                    - SpmallOrderRepository
                - 상품리뷰 
                    - SpmallProReviewRepository
                    - SpmallProUserRepository

            - DTO
                - SpmallProductForm
                - SpmallProdcutReviewForm
                - SpmallUserForm
                - SpmallUserLoginForm

                - 필요시 만듬

            - Entity
                - SpmallUser 
                - SpmallProduct
                - SpmallProReview
                - SpmallProUser
                - SpmallCart
                - SpmallOrder
                - SpmallAddress
                - RefreshToken
            
            - Exception
                - DataNotFoundException


    ## Next.js

        - HTML로부터 입력을 전달
            - 스프링부트 컨트롤러 역할해야함(라우팅, 스프링부트의 서비스와 연결)
        - 홈페이지 레이아웃 설정
            - MUI 사용 ToolPad
            - 왼쪽에 있을 메뉴
                - 장바구니 화면(로그인시 디비에서 불러와서 세션에 저장)
                    - 아이콘 (카트)
                    - 물건사진 / 물건 이름 / 물건 가격 / 물건 수량 /  총 가격 / 삭제(버튼)
                - 오더 화면
                    - 아이콘 (트럭)
                    - 관리자용
                    - 일반 이용자용
                - 주소 관리
                    - 지도 아이콘이 있으려나
                - 물품
                    - 물건 아이콘

                    - 카테고리 나눌까?
                        - switch 
                            - case 0 : 식품 
                            - case 1 : 가구
                            - case 2 : 전자제품
                            - case 3 : 완구
                    
                                            
                
        - 홈페이지 화면
            - 품목별 판매 순위표 => 디비에서 뽑아와서 만들 수 있을까?
            - 품목별 구매 물품 * 구매가격 순위표 => 디비에서 뽑아서 만듬
            - 상태변수로 방문자수 카운팅 하여 디비에 저장? 
            - 장바구니에 들은 물품 => 디비에서 읽어와서 가격만 보여줌 => 마우스위로 올리는 이벤트 발생시? 마우스 클릭 이벤트 발생시? 장바구니 창 살짝 커지면서 들어있는 물품(수량 제한해야할듯)과 수량 가격 보여줌

        - 물품 페이지 화면
            - 순서(역순으로)대로 바둑판 형 배치
            - 사진 / 물건 이름 / 가격
            - 물건을 누르면(클릭 이벤트? 하이퍼링크?) 물품 상세 페이지로 이동
        
        - 물품 상세 페이지
            - 물건 사진
            - 물건 설명
            - 물건 가격

            - 갯수 설정 인풋 타입 ( 라디오 혹은 넘버)
            - 초기화버튼
            - 서브밋 버튼

            - 물품 리뷰 리스트
            - 물품 리뷰 등록 버튼


        - 회원가입 화면 
            - 따로 관리?

        - 로그인 화면
            - 따로관리
        
## 개선사항        
        - 별점을 어디서 관리해야할까
            - 일단 리뷰에서 먹이고 그걸 취합해서 프러덕트 엔티티로 가져온다?
            - 그냥 리뷰에서 점수를 넣고, 프러덕스 서비스에서 FindByProductId 로 배열을 가져와서 취합한후 화면에 뿌려준다

        - 카트 에서 선택된 물품 id만 받아서 카트에있는 물품 아이디와 비교하고 if문 통과한 다음에만 오더로 넘기고 지울 때도 해당 아이디만 지우는게 나아보임 - 넥스트에서 체크 박스 여부로 넘기는 자료 선택하는 방법 필요함

    Next.js와 Spring Boot를 함께 사용하는 경우, 데이터 가공의 위치는 주로 다음과 같은 기준에 따라 결정됩니다:

### 1. **데이터의 복잡성**
   - **Spring Boot**: 서버 측에서 비즈니스 로직이나 데이터 가공이 복잡한 경우, 예를 들어 여러 데이터 소스에서 데이터를 통합하거나 복잡한 계산이 필요한 경우, Spring Boot에서 처리하는 것이 좋습니다.
   - **Next.js**: 간단한 데이터 가공이나 클라이언트 측에서만 필요한 데이터 변환(예: 포맷팅, 필터링 등)은 Next.js에서 처리할 수 있습니다.

### 2. **성능**
   - 서버 측에서 데이터를 가공하여 클라이언트로 전달하면, 클라이언트 측의 부하를 줄일 수 있습니다. 따라서 많은 데이터 처리와 관련된 로직은 Spring Boot에서 처리하는 것이 효율적입니다.

### 3. **유지보수성**
   - 비즈니스 로직이 많고 변경이 잦은 경우, 이를 서버 측(Spring Boot)에서 관리하면 유지보수에 유리합니다. 클라이언트와 서버 간의 명확한 역할 분담이 유지되기 때문입니다.

### 4. **보안**
   - 민감한 데이터 처리나 가공은 서버 측에서 수행하는 것이 안전합니다. 클라이언트에서 직접 처리하면 데이터 유출의 위험이 커질 수 있습니다.

### 결론
- **Spring Boot**: 비즈니스 로직, 데이터 통합, 복잡한 데이터 가공 등.
- **Next.js**: UI 관련 데이터 처리, 간단한 데이터 포맷팅, 필터링 등.

각 상황에 맞게 적절한 위치에서 데이터를 가공하면 더 효율적이고 유지보수하기 쉬운 코드를 작성할 수 있습니다.
switch (row.status) {
        case 0: return '주문접수';
        case 1: return '주문승인';
        case 2: return '배송시작';
        case 3: return '배송완료';
        case 4: return '주문닫힘';
        default: return '알 수 없음';
      }

switch (row.request) {
        case 0: return '요청 없음';
        case 1: return '반품 신청';
        case 2: return '반품 완료';
        default: return '알 수 없음';
      }


대시보드 위에 카트 그림? 글?

마우스 오버시 창이 하나 켜지면서 상품 갯수 상품 총 금액 주문 버튼

 그냥 메소드에서 처리함
넥스트 크로스 오리진 설정
Next.js에서 CORS를 설정하려면 보통 API 라우트에서 직접 처리해야 합니다. Next.js는 기본적으로 서버가 아닌 클라이언트 사이드에서 작동하므로, CORS 처리는 API 요청을 처리하는 서버 측에서 이루어져야 합니다.

API 라우트에서 CORS를 설정하는 방법은 다음과 같습니다:

API 라우트 생성: Next.js의 pages/api 디렉토리에 API 라우트를 생성합니다. 예를 들어, pages/api/example.js 파일을 생성합니다.

CORS 미들웨어 추가: 아래 예시와 같이 CORS 설정을 추가합니다. 여기서는 cors 패키지를 사용하여 CORS를 설정합니다. cors 패키지를 설치하려면 다음 명령어를 사용하세요.

bash
코드 복사
npm install cors
API 라우트 코드 작성: pages/api/example.js 파일에 CORS 미들웨어를 추가하는 코드를 작성합니다.

javascript
코드 복사
import Cors from 'cors';

// CORS 미들웨어 초기화
const cors = Cors({
    methods: ['POST', 'GET', 'HEAD'], // 허용할 HTTP 메서드
    origin: 'http://localhost:8080', // 허용할 출처
    credentials: true, // 자격 증명 허용
});

// API 라우트를 위한 헬퍼 함수
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

// API 핸들러
export default async function handler(req, res) {
    await runMiddleware(req, res, cors);
    
    // API 로직 구현
    res.json({ message: 'CORS가 설정되었습니다!' });
}
이 코드는 API 요청에 대해 CORS 정책을 적용합니다. 위의 코드에서 origin 속성에 Next.js 클라이언트의 URL을 설정하여 CORS 허용 출처를 지정합니다. 이 설정이 이루어진 후에는 Next.js 애플리케이션에서 해당 API를 호출할 때 CORS 오류가 발생하지 않아야 합니다.

주의사항
CORS는 보안 관련 설정이므로, 실제 운영 환경에서는 origin을 보다 구체적으로 설정하는 것이 좋습니다.
모든 API 라우트에 대해 CORS를 설정하고 싶다면, 공통 미들웨어로 처리하는 방법도 고려할 수 있습니다.
로고 만든곳
https://app.logomaster.ai/






3,951개 중 1개
프로젝트 ppt 메모
받은편지함

이재희 <jaeheehong0428@gmail.com>
첨부파일
오전 11:16 (42분 전)
나에게


 첨부파일 1개
  •  Gmail에서 스캔함
** 목적 표현이 중요 ( 서비스적 목표, 주제적 목표) **

1. 프로젝트 주제
( 첫 화면에 주제와 날짜 기간 표시)
2. 목적 & 주제
 - 기획 의도 
 - 주제에 맞는 기획의도(동기)와 목적성을 표기
 - 목적 목표를 로드맵으로 보여주면 좋다,
 - 서술형으로 기재하지않고 point만 표기하여 부연 설명한다.

3. 목적을 위해 어떻게 시행해야하는가?

- 개발 환경, 기술, 디자인 등등
- 어떤 대상?
- 근거를 제시


*** 미니프로젝트 시 프로젝트와 ppt를 동시에 진행해도 좋음
*** 백엔드 자바로 코딩시 아키텍쳐 설계도도 보여주면 좋음
*** 보통 ppt 15분 발표 / 시연 2분 / Q&A 3분 길면 20분
*** 중간에 오류발생시 대비해서 보여줄수있는 시연영상 준비

주제설정 =>> 기술이 들어가는게 아니라 쇼핑몰이라는 주제가 나와야한다

목표도 쇼핑몰이라는 ~~ 주제를 표현하는데 ~~라는 기술이 들어가야한다 

프로젝트 진행시 개발일정같은게 나오고 (달력)

ERD(디비구성)
프론트(화면구성)
백엔드(구조도)

피피티

ppt 글이 너무 많다.

피피티 주제가 나와야한다.

페이지가 많아지는걸 두려워하지마라

가운데에 주소하나만 나오는것도 괜찮다

목차가 있어야한다

뭘하겠다라는걸 설명후 개발환경이 나와야함

주요기능 1.2.3. 이런식으로 해야함