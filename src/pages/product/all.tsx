import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Grid, Paper } from '@mui/material';
import { productList } from '../../utils/api'; // productList 함수 임포트

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

interface Product {
  id: number;
  productName: string;
  price: number;
  imageUrl: string;
}

const All = ({ category }: { category: string }) => {
  const [items, setItems] = useState<Product[]>([]);  // 상태로 items 정의 (타입은 Product 배열)
  const [error, setError] = useState<string | null>(null); // 오류 상태

  // useEffect로 API 요청
  useEffect(() => {
    const fetchItems = async () => {
        try {
          const response = await productList(category);
          const data = response.items || []; // 'items' 키가 배열을 포함한다고 가정
          setItems(data);
        } catch (error) {
          setError('상품 데이터를 불러오는데 실패했습니다.');
          console.error(error);
        }
      };
      

    fetchItems();  // 컴포넌트가 렌더링될 때 데이터 요청
  }, [category]); // category가 변경될 때마다 호출

  return (
    <Box sx={{ flexGrow: 1 }}>
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* 오류 메시지 표시 */}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {items.map((item) => (
          <Grid item key={item.id} xs={2} sm={4} md={4}>
            <Item>
              <img src={item.imageUrl} alt={item.productName} style={{ height: 100, width: 100 }} />
              <div>{item.productName}</div>
              <div>{item.price}</div>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default All;
