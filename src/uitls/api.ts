import axios from "axios";
import {loginData,signupData} from '../types/datatype'

const API_URL =  'http://localhost:8080/spmallUser'; // spring boot 유저 처리 페이지



export const signup = async (userData:signupData)=>{
    try{
        const response = await axios.post(`${API_URL}/signup`,userData, {
            headers :{
                'Content-Type' :'application/json',
            },
        });
        return response.data; // 성공시
    } catch(error:any){
        throw error.response.data; // 실패시
    }
}

export const login = async (userData:loginData)=>{
    try{
        const response = await axios.post(`{API_URL}/login`,userData, {
            headers :{
                'Content-Type' :'application/json',
            },
        });
        return response.data; // 성공시
    } catch(error:any){
        throw error.response.data; // 실패시
    }
}

