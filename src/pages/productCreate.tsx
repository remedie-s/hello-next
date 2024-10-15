import { useState, FC, ChangeEvent, FormEvent } from "react";
import { productReg } from "../utils/api";

const ProductCreatePage: FC = () => {
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    quantity: "",
    imageUrl: "",
    category: "grocery",// 기본 선택 값을 "grocery"로 설정
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // HTMLInputElement와 HTMLSelectElement 모두 처리 가능 이렇게 해야 이벤트 처리가능
  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => { 
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

        <input
          name="productName"
          placeholder="물품이름"
          value={formData.productName}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="물품설명"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          placeholder="가격"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          name="quantity"
          placeholder="재고량"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
        <input
          name="imageUrl"
          placeholder="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            카테고리를 선택하세요
          </option>
          <option value="elect">전자제품</option>
          <option value="furniture">가구</option>
          <option value="grocery" >식료품</option>
          <option value="toy">장난감</option>
        </select>

        <button type="submit">물품등록</button>
      </form>
    </div>
  );
};

export default ProductCreatePage;
