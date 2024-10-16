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
export type prouctRegData = {
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
export type product= {
    id: number;
  productName: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;

}