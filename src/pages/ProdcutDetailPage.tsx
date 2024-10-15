
import { Box, Typography } from "@mui/material";
import { useParams } from "next/navigation";

// ProductDetailPage.tsx
function ProductDetailPage() {
    const { id } = useParams(); // URL 파라미터에서 상품 ID를 가져옴
    const product = getProductById(id); // 상품 정보를 가져오는 함수 (예시)
  
    return (
      <Box>
        <Typography variant="h4">{product.name}</Typography>
        <img src={product.imageUrl} alt={product.name} />
        <Typography>{product.description}</Typography>
        <Typography>{product.price}</Typography>
      </Box>
    );
  }
  export default ProductDetailPage;