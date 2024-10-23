"use client";
import { ChartDataByTotalCostOfProduct } from "@/utils/api"; // API 호출 함수
import { useEffect, useState } from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from "@mui/x-charts"; // PieChart 임포트
import { axisClasses } from '@mui/x-charts/ChartsAxis';

// 데이터 변환 함수
const transformData = (data: Record<string, number>): { month: string; value: number }[] => {
  return Object.entries(data).map(([productName, totalCost]) => ({
    month: productName.substring(0, 3), // x축 데이터 (상품 이름의 첫 3글자)
    value: totalCost,                    // y축 데이터 (판매량 * 가격)
  }));
};

const Chart4: React.FC = () => {
  const [chartData4, setChartData4] = useState<{ month: string; value: number }[]>([]);
  const [rawData, setRawData] = useState<Record<string, number>>({}); // 원본 데이터 저장
  const [error, setError] = useState<string>("");

  // 데이터 가져오기 및 변환
  const fetchChartData4 = async () => {
    try {
      const data: Record<string, number> = await ChartDataByTotalCostOfProduct();
      const transformedData = transformData(data); // API로부터 받은 데이터를 변환
      setChartData4(transformedData); // 변환된 데이터를 상태에 저장
      setRawData(data); // 원본 데이터 저장
    } catch (error: any) {
      setError(error.message || "차트4 데이터를 불러오는 데 실패했습니다.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChartData4(); // 컴포넌트가 마운트될 때 데이터 가져오기
  }, []);

  const chartSetting4 = {
    yAxis: [
      {
        label: '판매량 * 가격',
      },
    ],
    width: 500,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-20px, 0)',
      },
    },
  };

  return (
    <div>
      {error && <div>Error: {error}</div>}
      <BarChart
        dataset={chartData4} // 변환된 데이터 사용
        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
        series={[{ dataKey: 'value', label: '판매량 * 가격' }]}
        {...chartSetting4} // 차트 설정 적용
      />
      {rawData && ( // 원본 데이터가 있을 때 파이 차트 표시
        <PieChart
          series={[{
            data: Object.entries(rawData).map(([productName, totalCost]) => ({
              id: productName,
              value: totalCost,
              label: productName,
            })),
          }]}
          width={600}
          height={200}
        />
      )}
    </div>
  );
};

export default Chart4;
