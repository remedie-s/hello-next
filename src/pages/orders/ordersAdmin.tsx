import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { order } from '@/types/datatype';
import { orderDelete, orderList, orderModify } from '@/utils/api';

const OrderAdminGrid: React.FC = () => {
  const router = useRouter();
  const [rows, setRows] = React.useState<order[]>([]);
  const [selectedRows, setSelectedRows] = React.useState<GridRowId[]>([]); // 선택된 행의 ID를 저장할 상태
  

  const fetchCartList = async () => {
    try {
      const response: order[] = await orderList();
      console.log('Fetched cart list:', response);
      setRows(response);
    } catch (error) {
      console.error('Error fetching cart list:', error);
    }
  };

  React.useEffect(() => {
    fetchCartList();
  }, []);

  const handleModify = async (row: order) => {
     // 주문 상태가 4 이상이면 요청을 종료
     if (row.status >= 4) {
      console.error('주문 상태가 최종 단계입니다. 요청을 종료합니다.');
      return; // 함수 실행 종료
  }
   // 주문 상태가 4 미만일 때만 +1(다음 단계)
   const updateState = row.status + 1;
   console.log('반품 신청이 들어왔습니다.');



    const updatedOrderData = {
      
      id: row.id,
      userId: Number(sessionStorage.getItem("userId")),
      status: updateState,
      request:row.request,
    };

    try {
      const response: order[] = await orderModify(updatedOrderData);
      console.log('Modify response:', response);
      setRows(response);
    } catch (error) {
      console.error('Error modifying cart:', error);
    }
  };

  const handleRemove = async (row: order) => {
    const deleteOrderData = {
      id: row.id,
      userId: Number(sessionStorage.getItem("userId")),
    };

    try {
      const response: order[] = await orderDelete(deleteOrderData);
      console.log('삭제 요청:', response);
      setRows(response);
    } catch (error) {
      console.error('주문 삭제 오류:', error);
    }
  };



const columns: GridColDef[] = [
  { field: 'id', headerName: '오더번호', width: 90 },
  {
    field: 'productId',
    headerName: '상품 번호',
    width: 100,
    editable: false,
  },
  {
    field: 'productUrl',
    headerName: '이미지',
    width: 150,
    renderCell: (params) => (
      <img src={params.row.productUrl} alt={params.row.productUrl} style={{ width: '100%', height: 'auto' }} />
    ),
  },
  {
    field: 'productPrice',
    headerName: '가격',
    type: 'number',
    width: 150,
    editable: false,
  },
  {
    field: 'quantity',
    headerName: '수량',
    type: 'number',
    width: 150,
    editable: false,
  },
  {
    field: 'subTotal',
    headerName: '총 가격',
    type: 'number',
    width: 150,
    valueGetter: (value,row) => row.productPrice * row.quantity,
  },
  {
    field: 'status',
    headerName: '상태',
    width: 120,
    valueGetter: (value,row) => {
      switch (row.status) {
        case 0: return '주문접수';
        case 1: return '주문승인';
        case 2: return '배송시작';
        case 3: return '배송완료';
        case 4: return '주문닫힘';
        default: return '알 수 없음';
      }
    },
  },
  {
    field: 'request',
    headerName: '반품신청',
    width: 120,
    valueGetter: (value,row) => {
      switch (row.request) {
        case 0: return '요청 없음';
        case 1: return '반품 신청';
        case 2: return '반품 완료';
        default: return '알 수 없음';
      }
    },
  },
  
  {
    field: 'modify',
    headerName: '수정',
    width: 130,
    renderCell: (params) => (
      <Button variant="outlined" color="secondary" onClick={() => handleModify(params.row)}>주문상태변경</Button>
    ),
  },
  {
    field: 'remove',
    headerName: '삭제',
    width: 120,
    renderCell: (params) => (
      <Button variant="outlined" color="error"  onClick={() => handleRemove(params.row)}>삭제</Button>
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
              pageSize: 6,
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
      {/* <Button 
        variant="contained" 
        color="success" 
        fullWidth 
        onClick={handleCartToOrder}
        sx={{ mt: 2 }}
      >
        주문하기
      </Button> */}
    </Box>
  );
}

export default OrderAdminGrid;
