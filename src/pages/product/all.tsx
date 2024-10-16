import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Grid2 as Grid, Paper } from '@mui/material';
import { productList } from '../../utils/api'; 
import { productCate } from '@/types/productCate';
// import { useNavigate } from "react-router-dom";
import { useRouter } from 'next/router'; // useRouter를 임포트
import Link from 'next/link'; // Link 임포트
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  height: 180,
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const All = ({ category }: { category: string }) => {
  // const navigate = useNavigate(); // useNavigate 사용 - 에러떠서 라우터로 바뀜
  const router = useRouter(); // useRouter 사용
  const [items, setItems] = useState<productCate[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await productList(`${category}`);
        const data = response || [];
        setItems(data);
      } catch (error) {
        setError('상품 데이터를 불러오는데 실패했습니다.');
        console.error(error);
      }
    };

    fetchItems();
  }, [category]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
       {items.map((item) => (
        // 오류 고치는 방법모르겠음
          <Grid item key={item.id} xs={2} sm={4} md={4} component="div">
            <Link href={`/product/detail/${item.id}`} passHref>
              <Item>
                <img src={item.imageUrl} alt={item.productName} style={{ height: 100, width: 100 }} />
                <div>{item.productName}</div>
                <div>{item.price}</div>
              </Item>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default All;
