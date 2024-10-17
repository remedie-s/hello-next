"use client"
import { useState, FC, ChangeEvent, FormEvent } from "react";
import { productReg } from "../utils/api";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import { selectCate } from "@/types/selectCate";
import MenuItem from '@mui/material/MenuItem';
const ProductCreatePage: FC = () => {
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    quantity: "",
    imageUrl: "",
    category: "",// 기본 선택 값을 "grocery"로 설정 << 하면 무얼보내든지 식료품으로가서 여기서 설정하면안됨
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // HTMLInputElement와 HTMLSelectElement 모두 처리 가능 이렇게 해야 이벤트 처리가능
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { 
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    console.log(formData);

     // 숫자 필드를 string에서 number로 변환
     const productData = {
      ...formData,
      price: parseInt(formData.price),   // price를 숫자로 변환
      quantity: parseInt(formData.quantity), // quantity를 숫자로 변환
    };

    try {
      const result = await productReg(productData);
      setSuccess(`물품이 등록되었습니다 : ${result.productName}`);
      setFormData({
        productName: "",
        description: "",
        price:  "",
        quantity:  "",
        imageUrl: "",
        category: "",
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data || error.message || "Unknown error occurred";
      setError(errorMessage);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {error && <div style={{ color: "red" }}>{String(error)}</div>}
        {success && <div style={{ color: "green" }}>{success}</div>}

        <TextField
          name="productName"
          placeholder="물품이름"
          value={formData.productName}
          margin="normal"
          onChange={handleChange}
          required
        />
        <br/>
        {/* 마진 보통 여러줄 (최대 4줄) */}
        <TextField
          name="description"
          placeholder="물품설명"
          value={formData.description}
          margin="normal"
          multiline
          maxRows={4}
          onChange={handleChange}
          required
        />
        <br/>
        <TextField
          name="price"
          placeholder="가격"
          value={formData.price}
          margin="normal"
          onChange={handleChange}
          required
        />
        <br/>
        <TextField
          name="quantity"
          placeholder="재고량"
          value={formData.quantity}
          margin="normal"
          onChange={handleChange}
          required
        />
        <br/>
        <TextField
          name="imageUrl"
          placeholder="imageUrl"
          value={formData.imageUrl}
          margin="normal"
          onChange={handleChange}
          required
        />
        <br/>
        <TextField
        id="category"
        select
        name="category"
        label="category"
        defaultValue="grocery"
        value={formData.category} 
        margin="normal"
        onChange={handleChange} 
         size="small"
         required 
        helperText="카테고리를 설정해주세요"
      >
        {selectCate.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <br/>
        <Button  variant="contained" color="success" type="submit">물품등록</Button>
      </form>
    </div>
  );
};

export default ProductCreatePage;
