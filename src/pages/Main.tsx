import ResponsiveGrid from '@/layout/ResponsiveGrid';
import Dashboard from '../layout/Dashboard';
import Chart1 from "@/pages/Chart1";
import Chart2 from "@/pages/Chart2";
import Chart3 from "@/pages/Chart3";
import Chart4 from "@/pages/Chart4";
import { AppProvider, PageContainer } from '@toolpad/core';

const Main = () => {
    return (
        <div>
            <Dashboard>
            <PageContainer>
                {/* 여기에서 차트들을 렌더링합니다 */}
                
                    <Chart1 />
{/*                     
                    <Chart2 />
                    <Chart3 />
                    <Chart4 />
                 */}
            </PageContainer>
            </Dashboard>
        </div>
    );
}

export default Main;
