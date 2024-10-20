/**
 * 인터페이스 모음
 *  - 글로벌하게 사옹되는 인터페이스를 모아둔 ts
 *      - 전역적으로 사용되는 용도
 *      - interface만 모으겠다
 *  - 개별 모듈화를 통해서 정의(export)
 */

import { ReactElement } from "react";

//함수형 컴포넌트의 props 의 타입을 정의한것
export interface DemoProps {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window?: () => Window;

    /**
     * The current path name for routing.
     * Used to determine which page component to render.
     */
    pathname?: string;

    /**
     * A function to handle user authentication status.
     * Can be used to check if a user is logged in or not.
     */
    isAuthenticated?: () => boolean;

    /**
     * A callback function to log out the current user.
     * Used to clear user session and redirect to the login page.
     */
    onLogout?: () => void;

    /**
     * An object that contains user information.
     * This can be used to personalize the dashboard experience.
     */
    userInfo?: {
        name: string;
        email: string;
        role: string; // 예: "admin", "user"
    };

    /**
     * The children elements to be rendered inside the component.
     */
    children?: ReactElement; // children 속성을 추가
  }
  
export interface IPage {
    // 개별 페이지 별 URL
    pathname :string
    children?: ReactElement; // children 속성을 추가
  }

  // 세션용 타입 구성, 타입을 저장하겠다
  export type ISession={
    uid:string
  }

