import * as React from 'react';
import Box from '@mui/material/Box';
import { cartDelete, cartList, cartModify, OrderToCart } from '../../utils/api'; 
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { product } from '@/types/datatype';
import { useRouter } from 'next/router';

interface CartItem {
  id: number;
  imageUrl: string;
  productName: string;
  price: number;
  quantity: number;
}

const CartGrid: React.FC = () => {
  const router = useRouter();
  const [rows, setRows] = React.useState<CartItem[]>([]);
  const [selectedRows, setSelectedRows] = React.useState<GridRowId[]>([]); // 선택된 행의 ID를 저장할 상태

  const fetchCartList = async () => {
    try {
      const response: CartItem[] = await cartList();
      console.log('Fetched cart list:', response);
      setRows(response);
    } catch (error) {
      console.error('Error fetching cart list:', error);
    }
  };

  React.useEffect(() => {
    fetchCartList();
  }, []);

  const handleModify = async (row: CartItem) => {
    const updatedCartData = {
      id: row.id,
      quantity: row.quantity,
    };

    try {
      const response: CartItem[] = await cartModify(updatedCartData);
      console.log('Modify response:', response);
      setRows(response);
    } catch (error) {
      console.error('Error modifying cart:', error);
    }
  };

  const handleRemove = async (row: CartItem) => {
    const cartData = {
      id: row.id,
      quantity: row.quantity,
    };

    try {
      const response: CartItem[] = await cartDelete(cartData);
      console.log('삭제 요청:', response);
      setRows(response);
    } catch (error) {
      console.error('카트 삭제 오류:', error);
    }
  };

  const handleCartToOrder = async () => {
    console.log('주문 시작');
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      console.error("사용자 ID가 필요합니다.");
      return;
    }

    // 선택된 제품의 정보 가져오기
    const orderForms = selectedRows.map(id => {
      const row = rows.find(item => item.id === id);
      return {
        productId: row?.id,
        userId: Number(userId),
        quantity: row?.quantity,
      };
    }).filter(item => item.productId); // productId가 존재하는 항목만 필터링

    try {
      await Promise.all(orderForms.map(orderForm => OrderToCart(orderForm))); // 모든 주문 요청 보내기
      console.log("주문 되었습니다.");
      setTimeout(() => {
        router.push("/Main");
      }, 1000);
    } catch (error: any) {
      console.error(error.message || "주문 중 오류가 발생했습니다.");
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: '카트번호', width: 90 },
    {
      field: 'imageUrl',
      headerName: '이미지',
      width: 150,
      renderCell: (params) => (
        <img src={params.row.imageUrl} alt={params.row.productName} style={{ width: '100%', height: 'auto' }} />
      ),
    },
    {
      field: 'productName',
      headerName: '상품 이름',
      width: 150,
      editable: false,
    },
    {
      field: 'price',
      headerName: '가격',
      type: 'number',
      width: 200,
      editable: false,
    },
    {
      field: 'quantity',
      headerName: '수량',
      type: 'number',
      width: 150,
      editable: true,
    },
    {
      field: 'subTotal',
      headerName: '총 가격',
      type: 'number',
      width: 200,
      valueGetter: (value,row) => row.price * row.quantity,
    },
    {
      field: 'modify',
      headerName: '수정',
      width: 100,
      renderCell: (params) => (
        <button onClick={() => handleModify(params.row)}>수정</button>
      ),
    },
    {
      field: 'remove',
      headerName: '삭제',
      width: 100,
      renderCell: (params) => (
        <button onClick={() => handleRemove(params.row)}>삭제</button>
      ),
    },
  ];

  return (
    <Box sx={{ height: 800, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={100}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(newSelection) => {
          setSelectedRows([...newSelection]); // 새로운 배열로 복사하여 상태 업데이트
        }}
      />
      <Button 
        variant="contained" 
        color="success" 
        fullWidth 
        onClick={handleCartToOrder}
        sx={{ mt: 2 }}
      >
        주문하기
      </Button>
    </Box>
  );
};

export default CartGrid;
