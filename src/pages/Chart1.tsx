"use client";
import { ChartData } from "@/types/datatype";
import { ChartDataBySellCountOfCate } from "@/utils/api";
import { useEffect, useState } from "react";
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { PieChart } from "@mui/x-charts/PieChart";

const Chart1 = () => {
  const [chartData1, setChartData1] = useState<ChartData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchChartData1 = async () => {
    try {
      const data = await ChartDataBySellCountOfCate();
      setChartData1(data);
      console.log("1번 차트 데이터를 가져오는 중입니다.")
    } catch (error: any) {
      setError(error.message || "차트1 데이터를 불러오는데 실패했습니다.");
      console.error(error);
    } 
  };

  useEffect(() => {
    fetchChartData1();
  }, []);
  

  const chartSetting1 = {
    yAxis: [
      {
        label: 'sellCount (개)',
      },
    ],
    width: 500,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-10px, 0)',
      },
    },
  };

  return (
    <div>
      {error && <div>Error: {error}</div>}
      {chartData1 && (
        <BarChart
          dataset={[{
            month: 'elect', value: chartData1.elect,
          }, {
            month: 'furniture', value: chartData1.furniture,
          }, {
            month: 'grocery', value: chartData1.grocery,
          }, {
            month: 'toy', value: chartData1.toy,
          }]}
          xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
          series={[{ dataKey: 'value', label: '판매 수량' }]}
          {...chartSetting1}
        />
      )}
      <br/>
      {chartData1 && (
        <PieChart
          series={[{
            data: [
              { id: 'elect', value: chartData1.elect, label: 'elect' },
              { id: 'furniture', value: chartData1.furniture, label: 'furniture' },
              { id: 'grocery', value: chartData1.grocery, label: 'grocery' },
              { id: 'toy', value: chartData1.toy, label: 'toy' },
            ],
          }]}
          width={400}
          height={200}
        />
      )}
    </div>
  );
};

export default Chart1;
