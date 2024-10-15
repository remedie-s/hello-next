import { useState, FC, ChangeEvent, FormEvent } from "react";
import { productReg } from "../utils/api";

const ProductCreatePage: FC = () => {
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: 0,
    quantity: 0,
    imageUrl: "",
    category: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    console.log(formData);

    try {
      const result = await productReg(formData);
      setSuccess(`물품이 등록되었습니다 : ${result.productName}`);
      setFormData({
        productName: "",
        description: "",
        price: 0,
        quantity: 0,
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
        <input
          name="category"
          placeholder="category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <button type="submit">물품등록</button>
      </form>
    </div>
  );
};

export default ProductCreatePage;
