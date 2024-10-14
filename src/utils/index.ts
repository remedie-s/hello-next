/**
 * 이 어플리케이션상에서 사용하는 모든 유틸리티 모음
 * 개별 모듈화로 구성
 */
// 세션파트 시작==================================================

import type { ISession } from "../types/index";

//  세션키
const SESSION_KEY = "SESSION_KEY"; // 커스텀 가능함
// 세션획득
export function getSession():ISession{
        // 세션 여부 체크할떄
        const session=sessionStorage.getItem(SESSION_KEY);
        console.log(session)
        if(session!==null){
            // string => JSON 객체 => JS의 객체
            return JSON.parse(session);
        }
        else{
            return {uid:''};
        }
}
// 세션제거
export function removeSession():void{
        // 로그아웃
        sessionStorage.removeItem(SESSION_KEY);
}
// 세션추가 , 설정(업데이트)
export function setSession(session:ISession):void{
        // 로그인이 성공 후
        // 원본데이터는 {uid:"a@a.com"}, 저장할 데이터는 문자열
        // JSON 객체를 =>string 으로 직렬화
        sessionStorage.setItem(SESSION_KEY,JSON.stringify(session))
}


















// 세션파트   끝==================================================