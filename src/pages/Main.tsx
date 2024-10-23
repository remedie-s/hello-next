import ResponsiveGrid from "@/layout/ResponsiveGrid";
import Dashboard from "../layout/Dashboard";
import Chart1 from "@/pages/chart/Chart1";
import Chart2 from "@/pages/chart/Chart2";
import Chart3 from "@/pages/chart/Chart3";
import Chart4 from "@/pages/chart/Chart4";
import { AppProvider, PageContainer } from "@toolpad/core";

const Main = () => {
  return (
    <div>
      <Dashboard>
        <ResponsiveGrid>
          {/* 여기에서 차트들을 렌더링합니다 */}

          <Chart1 />

          <Chart2 />
          <Chart3 />
          <Chart4 />
        </ResponsiveGrid>
      </Dashboard>
    </div>
  );
};

export default Main;
