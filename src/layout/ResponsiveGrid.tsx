import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";

const items = [
  { id: 0, name: '마녀' ,url: 'https://cdn.pixabay.com/photo/2024/03/27/11/18/witch-8658915_1280.png', cost: 1000 },
  { id: 1, name: '꽃', url: 'https://cdn.pixabay.com/photo/2024/02/16/18/23/grape-hyacinths-8578115_1280.jpg', cost: 2000 },
  { id: 2, name: '그림', url: 'https://cdn.pixabay.com/photo/2021/10/20/14/00/stars-6726176_1280.jpg', cost: 3000 },
];

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

export default function ResponsiveGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {items.map((item) => (
          <Grid key={item.id} size={{ xs: 2, sm: 4, md: 4 }}>
            <Item >
              <img src={item.url} style={{height:100,width:100}}/>
              <div>{item.name}</div>
              <div>{item.cost}</div>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
