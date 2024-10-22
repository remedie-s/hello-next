import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Grid2, Paper } from '@mui/material';
import { productList } from '../../utils/api'; 
import { productCate } from '@/types/datatype';
import { useRouter } from 'next/router'; 
import Link from 'next/link'; 
import Dashboard from '../../layout/Dashboard'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  height: 180,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface AllProps {
  category: string; // category prop 추가
}

const All: React.FC<AllProps> = ({ category }) => { 
  const router = useRouter(); 
  const [items, setItems] = useState<productCate[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await productList(category);
        setItems(response || []);
      } catch (error) {
        setError('상품 데이터를 불러오는데 실패했습니다.');
        console.error(error);
      }
    };

    fetchItems();
  }, [category]);

  return (
    <div>
    <Box sx={{ flexGrow: 1 }}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <Grid2 container spacing={{ xs: 2, md:4 }} columns={{ xs: 4, sm: 5, md: 6 }}>
        {items.map((item) => (
           // @ts-ignore
          <Grid2  key={item.id}  xs={2} sm={4} md={6}> 
          {/* TODO Grid2에 오류 난걸 무시  */}
            <Link href={`/detail/${item.id}`} passHref>
              <Item>
                <img src={item.imageUrl} alt={item.productName} style={{ height: 100, width: 150 }} />
                <div>{item.productName}</div>
                <div>{item.price}</div>
              </Item>
            </Link>
          </Grid2>
        ))}
      </Grid2>
    </Box>
    </div>
  );
}

export default All;
