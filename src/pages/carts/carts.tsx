import * as React from 'react';
import Box from '@mui/material/Box';
import { cartDelete, cartList, cartModify } from '../../utils/api'; 
import { DataGrid, GridColDef } from '@mui/x-data-grid';


const CartGrid = () => {
  const [rows, setRows] = React.useState([]);

  const fetchCartList = async () => {
    try {
      const response = await cartList();
      console.log('Fetched cart list:', response);
      setRows(response);
    } catch (error) {
      console.error('Error fetching cart list:', error);
    }
  };

  React.useEffect(() => {
    fetchCartList();
  }, []);

  const handleModify = async (row:any) => {
    const updatedCartData = {
      id: row.id,
      quantity: row.quantity, // 수정할 수량
    };

    try {
      const response = await cartModify(updatedCartData);
      console.log('Modify response:', response);
      setRows(response);
    } catch (error) {
      console.error('Error modifying cart:', error);
    }
  };

  const handleRemove = async (row:any) => {
    const cartData = {
      id: row.id,
      quantity: row.quantity, //  그냥 같이 보냄
    };

    try {
      const response = await cartDelete(cartData);
      console.log('삭제 요청:', response);
      setRows(response);
    } catch (error) {
      console.error('카트 삭제 오류:', error);
    }
  };
  const columns: GridColDef[] = [
    { field: 'id', headerName: '카트번호', width: 90 },
    {
      field: 'imageUrl', // 'image'를 'imageUrl'로 수정
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
      valueGetter: (value,row) => row.price * row.quantity, // valueGetter 수정
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
      />
    </Box>
  );
};

export default CartGrid;