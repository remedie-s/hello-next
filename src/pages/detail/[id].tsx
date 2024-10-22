"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  productDetail,
  productReviewList,
  productReviewReg,
  productToCart,
} from "../../utils/api";
import { product, productReview } from "@/types/datatype";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DashboardLayoutBasic from "@/layout/Dashboard";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";
import Dashboard from '../../layout/Dashboard'
interface productId {
  productId: number; // category prop 추가
}

const ProductDetail: React.FC<productId>  = ({productId}) => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [review, setReview] = useState<string>("");
  const [rating, setRating] = useState<number | null>(2);
  const [hover, setHover] = useState(-1);
  const [reviews, setReviews] = useState<productReview[]>([]);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [ratingAvg, setRatingAvg]= useState<number|null>(0);

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

  const fetchReviews = async () => {
    try {
      const data = await productReviewList(Number(id));
      setReviews(data);
      
      if(data.length>0){
        const dataTotal =  data.reduce((sum:number,review:productReview)=>sum+review.rating,0);
        const dataAvg = dataTotal/data.length;
        setRatingAvg( dataAvg);
      }
      else{
        setRatingAvg(0);
      }
    } catch (error: any) {
      setReviewError(error.message || "리뷰 데이터 요청 중 오류 발생");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      fetchProduct();
      fetchReviews();
    }
  }, [id]);
  // 리뷰 목록 불러오기 함수
  


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
      setTimeout(() => {
        router.push("/Main"); // 또는 원하는 메인 페이지의 경로로 수정
      }, 1000); // 1000 밀리초 = 1초
    } catch (error: any) {
      setError(error.message || "장바구니 추가 중 오류가 발생했습니다.");
    }
  };
  const handleMain = () => {
    router.push("/Main"); // 또는 원하는 메인 페이지의 경로로 수정
  };
  // 리뷰 추가 시스템
  const handleReviewAdd = async () => {
    if (!product) return;
    const userId = sessionStorage.getItem("userId");
    const reviewForm = {
      productId: product.id,
      userId: Number(userId),
      rating: rating,
      content: review,
    };
    try {
      await productReviewReg(reviewForm);
      setSuccessMessage("물품 리뷰등록에 성공했습니다");
      await fetchReviews();
    } catch (error: any) {
      setReviewError(error.message || "리뷰 데이터를 불러오는데 실패했습니다.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>상품을 찾을 수 없습니다.</div>;

  //리뷰 별점 시스템
  const labels: { [index: string]: string } = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };
  function getLabelText(rating: number) {
    return `${rating} Star${rating !== 1 ? "s" : ""}, ${labels[rating]}`;
  }
  
  const getAverageRatingLabel = (rating: number | null) => {
    const adjustedRating = rating !== null ? (Math.round(rating * 2)) / 2 : 0; // 평균 레이팅 처리 후 라벨 붙임
    return `${adjustedRating} Star${adjustedRating !== 1 ? "s" : ""}, ${labels[adjustedRating] || ''}`;
  };
  

  return (
    <Dashboard>
    <div>
      
      {error && <div style={{ color: "red" }}>{String(error)}</div>}
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4">{product.productName}</Typography>
        </Box>
        <Box sx={{ mb: 3, textAlign: "center" }}>
          <img src={product.imageUrl} alt={product.productName} height="300" />
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1">
            물품 설명 : {product.description}
          </Typography>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">가격: {product.price}</Typography>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2">재고량: {product.quantity}</Typography>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2">판매량: {product.sellCount}</Typography>
        </Box>
        <Box sx={{ mb: 3 }}>
        <Typography component="legend">평균 평점</Typography>
        <Rating  value={ratingAvg ||0} readOnly />
        <Typography variant="body2">
          라벨 {getAverageRatingLabel(ratingAvg)} {/* 평균 평점 라벨 표시 */}
        </Typography>
        
          </Box>
        <br />
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
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={handleMain}
          sx={{ mt: 2 }} // 버튼 상단 여백 추가
        >
          메인메뉴로 돌아가기
        </Button>
      </Container>
      <Container maxWidth="sm">
        <TextField
          type="text"
          value={review}
          margin="normal"
          fullWidth
          onChange={(e) => {
            const value = e.target.value;
            setReview(value);
          }}
        />
        <Rating
          name="hover-feedback"
          value={rating}
          precision={0.5}
          getLabelText={getLabelText}
          onChange={(event, newRating) => {
            setRating(newRating);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {rating !== null && (
          <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
        )}
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={handleReviewAdd}
          sx={{ mt: 2 }} // 버튼 상단 여백 추가
        >
          리뷰 입력
        </Button>
      </Container>
      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">리뷰</Typography>
          {reviewError && <div style={{ color: "red" }}>{reviewError}</div>}
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <Box
                key={review.id}
                sx={{ mb: 2, p: 2, border: "1px solid #ccc" }}
              >
                
                <Typography variant="body1">{review.content}</Typography>
                <Rating value={review.rating} readOnly />
                <Typography variant="body2">
                  작성일: {new Date(review.createDate).toLocaleDateString()}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography>리뷰가 없습니다.</Typography>
          )}
        </Box>
      </Container>
      
    </div>
    </Dashboard>
  );
};
// 레이아웃 적용을 위한 getLayout 함수
// ProductDetail.getLayout = (page: React.ReactElement) => {
//   return <DashboardLayoutBasic pathname="product/detail/:segment">{page}</DashboardLayoutBasic>;
// };

export default ProductDetail;
