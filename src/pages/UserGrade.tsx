import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowId,GridValueGetter  } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import { CartItem, product, userData, userGradeData } from "@/types/datatype";
import { useRouter } from "next/router";
import { UserData, UserGradeModify } from "@/utils/api";

const UserGradeGrid: React.FC = () => {
  const router = useRouter();
  const [rows, setRows] = React.useState<userData[]>([]);
  const [isEmptyUser, setIsEmptyUser] = React.useState<boolean>(false); // 카트 비어있는지 상태 추가

  const fetchUserList = async () => {
    try {
      const response: userData[] = await UserData();
      console.log("Fetched user list:", response);
      setRows(response);
      setIsEmptyUser(response.length === 0);
    } catch (error) {
      console.error("Error fetching user list:", error);
      setIsEmptyUser(true); // 에러가 발생해도 카트가 비어있다고 설정
    }
  };

  React.useEffect(() => {
    fetchUserList();
  }, []);

  const handleModify = async (row: userGradeData) => {
    const userData = {
      id: row.id,
      userGrade: row.userGrade,
    };
    if(userData.userGrade<0||userData.userGrade>4){
        console.error("유저 등급 범위를 벗어났습니다.")
        return;
    }

    try {
      const response: userData[] = await UserGradeModify(userData);
      console.log("Modify response:", response);
      setRows(response);
    } catch (error) {
      console.error("Error modifying user:", error);
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "고유번호", width: 100 },
    {
      field: "username",
      headerName: "유저아이디",
      width: 150,
      editable: false,
    },
    {
      field: "firstName",
      headerName: "이름",
      width: 100,
      editable: false,
    },
    {
      field: "lastName",
      headerName: "성",
      width: 100,
      editable: false,
    },
    {
      field: "phoneNumber",
      headerName: "전화번호",
      type: "number",
      width: 150,
      editable: false,
    },
    {
      field: "email",
      headerName: "이메일",
      type: "number",
      width: 200,
      editable: false,
    },
    {
      field: "userGrade",
      headerName: "유저등급",
      type: "number",
      width: 100,
      editable: true,
    },
    
    {
      field: "modify",
      headerName: "수정",
      width: 100,
      renderCell: (params) => (
        <Button onClick={() => handleModify(params.row)}>수정</Button>
      ),
    },
  ];

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      {isEmptyUser ? (
        <Typography variant="h6" align="center" sx={{ mt: 2 }}>
          유저가 없습니다
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
            ></DataGrid>
        </>
      )}
    </Box>
  );
};

export default UserGradeGrid;
