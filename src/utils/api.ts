import axios from "axios";
import {loginData,signupData,prouctToCartData, addressRegData, productRegData, cart,  cartModifyData, cartToOrderData, orderModifyData, orderDeleteData, productReveiwRegData, userGradeData} from '../types/datatype'

const API_URL =  'http://localhost:8080'; // spring boot 유저 처리 페이지
const api = axios.create({
    baseURL:API_URL, // Spring Boot 서버의 URL
})
// 요청 인터셉터 추가
api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('accessToken'); // 세션 스토리지에서 토큰 가져오기
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Authorization 헤더에 토큰 추가
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
  

export const signup = async (userData:signupData)=>{
    try{
        const response = await api.post(`${API_URL}/spmallUser/signup`,userData, {
            headers :{
                'Content-Type' :'application/json',
            },
        });
        return response.data; // 성공시
    } catch(error:any){
        throw error.response.data; // 실패시
    }
}

export const login = async (loginUserData:loginData)=>{
    try{
        const response = await api.post(`${API_URL}/spmallUser/login`,loginUserData, {
            headers :{
                'Content-Type' :'application/json',
            },
        });
        return response.data; // 성공시
    } catch(error:any){
        throw error.response.data; // 실패시
    }
}

export const logout = async ()=>{
    try{
        const response = await api.get(`${API_URL}/spmallUser/logout`, {
            headers :{
                'Content-Type' :'application/json',
            },
        });
        return response.data; // 성공시
    } catch(error:any){
        throw error.response.data; // 실패시
    }
}

export const addressReg = async (addressData:addressRegData)=>{
    try{
        const response = await api.post(`${API_URL}/api/address/create`,addressData, {
            headers :{
                'Content-Type' :'application/json',
            },
        });
        return response.data; // 성공시
    } catch(error:any){
        throw error.response.data; // 실패시
    }
}
export const productReg = async (productData:productRegData)=>{
    try{
        const response = await api.post(`${API_URL}/api/product/create`,productData, {
            headers :{
                'Content-Type' :'application/json',
            },
        });
        return response.data; // 성공시
    } catch(error:any){
        throw error.response.data; // 실패시
    }
}
export const productList = async (category:string)=>{
    try{const response = await api.get(`${API_URL}/api/product/list/${category}`,{
        headers :{
            'Content-Type' :'application/json',
        },
    });
    return response.data;}// 성공시
    catch(error:any){
        throw error.response.data; // 실패시
    }    
}

export const productDetail = async (productId:number)=>{
    try{const response = await api.get(`${API_URL}/api/product/${productId}`,{
        headers :{
            'Content-Type' :'application/json',
        },
    });
    return response.data;}// 성공시
    catch(error:any){
        throw error.response.data; // 실패시
    }    
}
export const productToCart = async (productData:prouctToCartData)=>{
    try{
        const response = await api.post(`${API_URL}/api/product/cart`,productData, {
            headers :{
                'Content-Type' :'application/json',
            },
        });
        return response.data; // 성공시
    } catch(error:any){
        throw error.response.data; // 실패시
    }
} // product 데이터에 담아서 보내야함

export const productReviewReg = async (reviewData:productReveiwRegData)=>{
    try{
        const response = await api.post(`${API_URL}/api/product/review`,reviewData, {
            headers :{
                'Content-Type' :'application/json',
            },
        });
        return response.data; // 성공시
    } catch(error:any){
        throw error.response.data; // 실패시
    }
}
export const productReviewList= async (id:number)=>{
    try{const response = await api.get(`${API_URL}/api/product/${id}/review`,{
        headers :{
            'Content-Type' :'application/json',
        },
    });
    return response.data;}// 성공시
    catch(error:any){
        throw error.response.data; // 실패시
    }    
}

export const cartList = async ()=>{
    try{const response = await api.get(`${API_URL}/api/cart/list`,{
        headers :{
            'Content-Type' :'application/json',
        },
    });
    return response.data;}// 성공시
    catch(error:any){
        throw error.response.data; // 실패시
    }    
}
export const cartSummary = async ()=>{
    try{const response = await api.get(`${API_URL}/api/cart/summary`,{
        headers :{
            'Content-Type' :'application/json',
        },
    });
    return response.data;}// 성공시
    catch(error:any){
        throw error.response.data; // 실패시
    }    
}


export const cartModify = async (cartData:cartModifyData)=>{
    try{
        const response = await api.post(`${API_URL}/api/cart/modify/${cartData.id}`,cartData, {
            headers :{
                'Content-Type' :'application/json',
            },
        });
        return response.data; // 성공시
    } catch(error:any){
        throw error.response.data; // 실패시
    }
}
export const cartDelete = async (cartData:cartModifyData)=>{
    try{
        const response = await api.post(`${API_URL}/api/cart/delete/${cartData.id}`,cartData, {
            headers :{
                'Content-Type' :'application/json',
            },
        });
        return response.data; // 성공시
    } catch(error:any){
        throw error.response.data; // 실패시
    }
}
export const OrderToCart = async (cartData:cartToOrderData)=>{
    try{
        const response = await api.post(`${API_URL}/api/cart/cartToOrder`,cartData, {
            headers :{
                'Content-Type' :'application/json',
            },
        });
        return response.data; // 성공시
    } catch(error:any){
        throw error.response.data; // 실패시
    }
} // product 데이터에 담아서 보내야함


export const orderList = async ()=>{
    try{const response = await api.get(`${API_URL}/api/order/list`,{
        headers :{
            'Content-Type' :'application/json',
        },
    });
    return response.data;}// 성공시
    catch(error:any){
        throw error.response.data; // 실패시
    }    
}
export const orderListBySeller = async ()=>{//인증정보는 스프링 시큐리티에서구분
    try{const response = await api.get(`${API_URL}/api/order/list/admin`,{
        headers :{
            'Content-Type' :'application/json',
        },
    });
    return response.data;}// 성공시
    catch(error:any){
        throw error.response.data; // 실패시
    }    
}

export const orderModify = async (orderData:orderModifyData)=>{
    try{
        const response = await api.post(`${API_URL}/api/order/modify/${orderData.id}`,orderData, {
            headers :{
                'Content-Type' :'application/json',
            },
        });
        return response.data; // 성공시
    } catch(error:any){
        throw error.response.data; // 실패시
    }
}

export const orderDelete = async (orderData:orderDeleteData)=>{
    try{
        const response = await api.post(`${API_URL}/api/order/delete/${orderData.id}`,orderData, {
            headers :{
                'Content-Type' :'application/json',
            },
        });
        return response.data; // 성공시
    } catch(error:any){
        throw error.response.data; // 실패시
    }
}

export const ChartDataBySellCountOfCate = async ()=>{
    try{const response = await api.get(`${API_URL}/api/product/ChartDataBySellCountOfCate`,{
        headers :{
            'Content-Type' :'application/json',
        },
    });
    return response.data;}// 성공시
    catch(error:any){
        throw error.response.data; // 실패시
    }    
}
export const ChartDataByTotalCostOfCate = async ()=>{
    try{const response = await api.get(`${API_URL}/api/product/ChartDataByTotalCostOfCate`,{
        headers :{
            'Content-Type' :'application/json',
        },
    });
    return response.data;}// 성공시
    catch(error:any){
        throw error.response.data; // 실패시
    }    
}
export const ChartDataBySellCountOfProduct = async ()=>{
    try{const response = await api.get(`${API_URL}/api/product/ChartDataBySellCountOfProduct`,{
        headers :{
            'Content-Type' :'application/json',
        },
    });
    return response.data;}// 성공시
    catch(error:any){
        throw error.response.data; // 실패시
    }    
}
export const ChartDataByTotalCostOfProduct = async ()=>{
    try{const response = await api.get(`${API_URL}/api/product/ChartDataByTotalCostOfProduct`,{
        headers :{
            'Content-Type' :'application/json',
        },
    });
    return response.data;}// 성공시
    catch(error:any){
        throw error.response.data; // 실패시
    }    
}

export const UserData = async ()=>{
    try{const response = await api.get(`${API_URL}/api/order/userList`,{
        headers :{
            'Content-Type' :'application/json',
        },
    });
    return response.data;}// 성공시
    catch(error:any){
        throw error.response.data; // 실패시
    }    
}
export const UserGradeModify = async (userData:userGradeData)=>{
    try{
        const response = await api.post(`${API_URL}/api/order/modifyGrade/${userData.id}`,userData, {
            headers :{
                'Content-Type' :'application/json',
            },
        });
        return response.data; // 성공시
    } catch(error:any){
        throw error.response.data; // 실패시
    }
}

