import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { productDetail, productToCart } from "../../../utils/api";
import { product } from "@/types/datatype";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const data = await productDetail(Number(id));
          setProduct(data);
        } catch (error: any) {
          setError(error.message || "상품 데이터를 불러오는데 실패했습니다.");
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      setError("사용자 ID가 필요합니다.");
      return;
    }

    const cartForm = {
      productId: product.id,
      userId: Number(userId),
      quantity: quantity,
    };

    try {
      await productToCart(cartForm);
      setSuccessMessage("장바구니에 상품이 추가되었습니다.");
    } catch (error: any) {
      setError(error.message || "장바구니 추가 중 오류가 발생했습니다.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>상품을 찾을 수 없습니다.</div>;

  return (
    <div>
      {error && <div style={{ color: "red" }}>{String(error)}</div>}
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4">{product.productName}</Typography>
        </Box>
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <img src={product.imageUrl} alt={product.productName} height="300" />
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1">물품 설명 : {product.description}</Typography>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">Price: {product.price}</Typography>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2">재고량: {product.quantity}</Typography>
        </Box>
        
        <TextField
          type="number"
          value={quantity}
          margin="normal"
          fullWidth
          onChange={(e) => {
            const value = Math.max(Number(e.target.value), 1);
            setQuantity(value);
          }}
        />
        <Button 
          variant="contained" 
          color="success" 
          fullWidth 
          onClick={handleAddToCart}
          sx={{ mt: 2 }} // 버튼 상단 여백 추가
        >
          장바구니에 추가
        </Button>
      </Container>
    </div>
  );
};

export default ProductDetail;
