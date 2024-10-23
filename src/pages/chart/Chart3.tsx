"use client";
import { ChartData } from "@/types/datatype"; // 필요한 타입 가져오기
import { ChartDataBySellCountOfProduct } from "@/utils/api"; // API 호출 함수
import { useEffect, useState } from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { PieChart } from "@mui/x-charts";

// 데이터 변환 함수
const transformData = (data: Record<string, number>): { month: string; value: number }[] => {
  return Object.entries(data).map(([productName, sellCount]) => ({
    month: productName.substring(0,3), // x축 데이터
    value: sellCount,    // y축 데이터
  }));
};

const Chart3: React.FC = () => {
  const [chartData, setChartData] = useState<{ month: string; value: number }[]>([]);
  const [rawData, setRawData] = useState<Record<string, number>>({}); // 원본 데이터 저장
  const [error, setError] = useState<string>("");

  // 데이터 가져오기 및 변환
  const fetchChartData = async () => {
    try {
      const data: Record<string, number> = await ChartDataBySellCountOfProduct();
      const transformedData = transformData(data); // API로부터 받은 데이터를 변환
      setChartData(transformedData); // 변환된 데이터를 상태에 저장
      setRawData(data); // 원본 데이터 저장
    } catch (error: any) {
      setError(error.message || "데이터를 불러오는 데 실패했습니다.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChartData(); // 컴포넌트가 마운트될 때 데이터 가져오기
  }, []);

  const chartSetting = {
    yAxis: [
      {
        label: '판매량',
      },
    ],
    width: 600,
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
        dataset={chartData} // 변환된 데이터 사용
        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
        series={[{ dataKey: 'value', label: '판매 수량' }]}
        {...chartSetting}
      />
       {chartData && (
        <PieChart
        series={[{
          data: Object.entries(rawData).map(([productName, sellCount]) => ({
            id: productName,
            value: sellCount,
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

export default Chart3;
