/**
 * 인터페이스 모음
 *  - 글로벌하게 사옹되는 인터페이스를 모아둔 ts
 *      - 전역적으로 사용되는 용도
 *      - interface만 모으겠다
 *  - 개별 모듈화를 통해서 정의(export)
 */
//함수형 컴포넌트의 props 의 타입을 정의한것
export interface DemoProps {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window?: () => Window;
  }
  
export interface IPage {
    // 개별 페이지 별 URL
    pathname :string
  }

  // 세션용 타입 구성, 타입을 저장하겠다
  export type ISession={
    uid:string
  }

