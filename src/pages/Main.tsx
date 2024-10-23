import ResponsiveGrid from "@/layout/ResponsiveGrid";
import Dashboard from "../layout/Dashboard";
import Chart1 from "@/pages/chart/Chart1";
import Chart2 from "@/pages/chart/Chart2";
import Chart3 from "@/pages/chart/Chart3";
import Chart4 from "@/pages/chart/Chart4";
import { AppProvider, PageContainer } from "@toolpad/core";
import mainImg from "../image/MainPage.png";
import { Box, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const Main = () => {
  return (
    <div>
      <Dashboard>
        <ResponsiveGrid>
          {/* 여기에서 차트들을 렌더링합니다 */}
          <Box>
            <img src={mainImg.src} width={500} />
            <br />
            <Typography
              variant="h4"
              sx={{ fontFamily: "Open Sans, sans-serif" }}
            >
              김재희의 쇼핑몰사이트입니다
            </Typography>
          </Box>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar />
            </LocalizationProvider>
          </Box>
          <Box>
            <Chart4></Chart4>
          </Box>
        </ResponsiveGrid>
      </Dashboard>
    </div>
  );
};

export default Main;
