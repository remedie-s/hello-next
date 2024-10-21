export type signupData={
    username:string;
    password1:string;
    password2:string;
    firstName:string;
    lastName:string;
    phoneNumber:string;
    email:string;
}
export type loginData = {
    username:string;
    password:string;
}
export type addressRegData = {
    buildingNumber: number,
    city: string,
    detailAddress: string,
    streetName: string,
}

export type Product = {
    id: number;
    productName: string;
    imageUrl: string;
    price: number;
  }
export type productCate ={
    id: number;
    productName: string;
    price: number;
    imageUrl: string;
}

export type  ProductDetail={
    id:number,
    productName:string,
    description:string,
    price:number,
    quantity:number,
    imageUrl:string,
    createDate:Date,
    category:string,
    sellCount:number
}

export type productRegData = {
    productName:string;
    description:string;
    price:number;
    quantity:number;
    imageUrl:string;
    category:string;
}
export type prouctToCartData = {
    quantity:number;
    productId:number;
    userId:number;
}
export type productReveiwRegData = {
    productId:number;
    userId:number;
    content:string;
    rating:number|null;
}
export type productReview ={
    id:number;
    content:string;
    rating:number;
    createDate:Date;
}

export type cartToOrderData = {
    quantity:number|undefined;
    productId:number|undefined;
    userId:number|undefined;
}
export type product= {
    sellCount: number;
    id: number;
    productName: string;
    description: string;
    price: number;
    quantity: number;
    imageUrl: string;

}

export type CartItem= {
    id: number;
    productId:number;
    imageUrl: string;
    productName: string;
    price: number;
    quantity: number;
  }

export type cart= {
    id :number;
    imageUrl:string;
    productName:string;
    price:number;
    quantity:number;
}
export type cartSummaryType = {
    userId : number;
    totalCostSum :number;
    totalQuantitySum :number;
}

export type cartModifyData={
    id:number;
    quantity:number;
}

export type order={
    id:number;
	userId:number;
	productId:number;
	productUrl:string;
	productPrice:number;
    quantity:number;
    status:number;
    request:number;
    createDate:Date;
}

export type orderModifyData={
    id:number;
    userId:number;
    status:number;
    request:number;
}

export type orderDeleteData={
    id:number;
    userId:number;
}