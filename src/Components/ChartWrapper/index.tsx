import React from 'react';
import Chart from 'react-apexcharts';
import { ChartServer } from '../App/types';

import { ChartData } from './types';
import './style.scss';
import { chartLocalization } from './chartLocalization';
interface ChartWrapperProps {
  data: ChartServer[];
}

const ChartWrapper = ({ data }: ChartWrapperProps) => {
  const decimalsInFloat = (data: ChartServer) => {
    return 7 - data.prices[0].substring(0, data.prices[0].indexOf('.')).length;
  };

  const chartData: ChartData = {
    options: {
      chart: {
        id: 'Crypto',
        locales: chartLocalization,
        defaultLocale: 'ru',
      },
      markers: {
        size: 2,
        hover: {
          size: 4,
        },
      },
      xaxis: {
        type: 'datetime',
        categories:
          data.length > 0
            ? data[0].timestamps.map((timestamp) => new Date(timestamp).getTime())
            : [],
      },
      yaxis: [
        {
          decimalsInFloat: data?.length > 0 ? decimalsInFloat(data[0]) : 0,
          axisBorder: {
            show: data.length > 0,
            color: '#008ffb',
          },
        },
        {
          opposite: true,
          decimalsInFloat: data?.length > 1 ? decimalsInFloat(data[1]) : 0,
          axisBorder: {
            show: data.length > 1,
            color: '#00e396',
          },
        },
      ],
    },
    series: data?.map((item) => {
      return {
        name: item.currency,
        type: 'line',
        data: item.prices.map((price) => parseFloat(price)),
      };
    }),
  };

  return (
    <div className='ChartWrapper'>
      <Chart options={chartData.options} series={chartData.series} height='600' />
    </div>
  );
};

export { ChartWrapper };
