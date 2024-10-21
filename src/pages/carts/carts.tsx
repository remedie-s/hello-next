import * as React from 'react';
import Box from '@mui/material/Box';
import { cartDelete, cartList, cartModify, OrderToCart } from '../../utils/api'; 
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import { Button, Typography } from '@mui/material';
import { CartItem, product } from '@/types/datatype';
import { useRouter } from 'next/router';



const CartGrid: React.FC = () => {
  const router = useRouter();
  const [rows, setRows] = React.useState<CartItem[]>([]);
  const [selectedRows, setSelectedRows] = React.useState<GridRowId[]>([]); // 선택된 행의 ID를 저장할 상태
  const [totalPrice, setTotalPrice] = React.useState<number>(0); // 총 가격 상태 추가
  const [isEmptyCart, setIsEmptyCart] = React.useState<boolean>(false); // 카트 비어있는지 상태 추가
  

  const fetchCartList = async () => {
    try {
      const response: CartItem[] = await cartList();
      console.log('Fetched cart list:', response);
      setRows(response);
      setIsEmptyCart(response.length === 0);
    } catch (error) {
      console.error('Error fetching cart list:', error);
      setIsEmptyCart(true); // 에러가 발생해도 카트가 비어있다고 설정
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
      setIsEmptyCart(response.length === 0); // 삭제 후 카트 비어있으면 상태 업데이트
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
        productId: row?.productId,
        userId: Number(userId),
        quantity: row?.quantity,
      };
    }).filter(item => item.productId); // productId가 존재하는 항목만 필터링

    try {
      await Promise.all(orderForms.map(orderForm => OrderToCart(orderForm))); // 모든 주문 요청 보내기
      console.log("주문 되었습니다.");
      fetchCartList(); 
    } catch (error: any) {
      console.error(error.message || "주문 중 오류가 발생했습니다.");
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: '카트번호', width: 90 },
    {
      field: 'productId',
      headerName: '상품 번호',
      width: 100,
      editable: false,
    },
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
        <Button onClick={() => handleModify(params.row)}>수정</Button>
      ),
    },
    {
      field: 'remove',
      headerName: '삭제',
      width: 100,
      renderCell: (params) => (
        <Button onClick={() => handleRemove(params.row)}>삭제</Button>
      ),
    },
  ];
    // 선택된 행의 총 가격 계산
    React.useEffect(() => {
      const total: number = selectedRows.reduce((sum: number, id: GridRowId) => {
        const row = rows.find(item => item.id === id);
        return sum + (row ? row.price * row.quantity : 0);
      }, 0);
      setTotalPrice(total);
    }, [selectedRows, rows]);
  
    return (
      <Box sx={{ height: '100%', width: '100%' }}>
        {isEmptyCart ? (
          <Typography variant="h6" align="center" sx={{ mt: 2 }}>
            카트가 비어 있습니다.
          </Typography>
        ) : (
          <>
            <DataGrid
              rows={rows}
              columns={columns}
              rowHeight={70}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
              onRowSelectionModelChange={(newSelection) => {
                setSelectedRows([...newSelection]);
              }}
            />
            <Typography variant="h6" align="center" sx={{ mt: 2 }}>
              총 가격: {totalPrice.toLocaleString()} 원
            </Typography>
            <Button 
              variant="contained" 
              color="success" 
              fullWidth 
              onClick={handleCartToOrder}
              sx={{ mt: 2 }}
            >
              주문하기
            </Button>
          </>
        )}
      </Box>
    );
  };
  

export default CartGrid;
