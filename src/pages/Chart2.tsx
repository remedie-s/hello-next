"use client";
import { ChartData } from "@/types/datatype";
import { ChartDataByTotalCostOfCate } from "@/utils/api";
import { useEffect, useState } from "react";
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { PieChart } from "@mui/x-charts";

const Chart2 = () => {
  const [chartData2, setChartData2] = useState<ChartData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchChartData2 = async () => {
    try {
      const data = await ChartDataByTotalCostOfCate();
      setChartData2(data);
    } catch (error: any) {
      setError(error.message || "차트2 데이터를 불러오는데 실패했습니다.");
      console.error(error);
    } 
  };

  useEffect(() => {
    fetchChartData2();
  }, []);

  const chartSetting2 = {
     yAxis: [
    {
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
      {chartData2 && (
        <BarChart 
          dataset={[
            { month: 'elect', value: chartData2.elect },
            { month: 'furniture', value: chartData2.furniture },
            { month: 'grocery', value: chartData2.grocery },
            { month: 'toy', value: chartData2.toy },
          ]}
          xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
          series={[{ dataKey: 'value', label: '판매량 * 가격(단위 1,000)' }]}
          {...chartSetting2}
        />
      )}
      {chartData2 && (
        <PieChart
          series={[{
            data: [
              { id: 'elect', value: chartData2.elect, label: 'elect' },
              { id: 'furniture', value: chartData2.furniture, label: 'furniture' },
              { id: 'grocery', value: chartData2.grocery, label: 'grocery' },
              { id: 'toy', value: chartData2.toy, label: 'toy' },
            ],
          }]}
          width={400}
          height={200}
        />
      )}
    </div>
  );
};

export default Chart2;
