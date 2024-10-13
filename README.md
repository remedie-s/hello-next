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
    - next.js ver
    - react
    - typescript
    - java 17
    - spring boot
    - oracle 18c

# 시스템별 역할

    ## Spring Boot

        - restAPI
            - restAPI Controller

        - 로그인
            - 스프링 시큐리티?
                - 오래걸림
                - 기본에 했던 코드에서 복사하면 그렇게 안걸릴지도?

        - DB와 연결
            - Config
                - JwtProperties
                - SecurityConfig
                - TokenAuthenticationFilter
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
                    - SpmallProUserService

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
                - exception


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
        







