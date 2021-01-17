export type ChartData = {
  options: {
    chart: {
      id: string;
      locales: any[];
      defaultLocale: string;
    };
    markers: {
      size: number;
      hover: {
        size: 4;
      };
    };
    xaxis: {
      type: string;
      categories: number[];
    };
    yaxis: [
      {
        decimalsInFloat: number;
        axisBorder: {
          show: boolean;
          color: string;
        };
      },
      {
        opposite: boolean;
        decimalsInFloat: number;
        axisBorder: {
          show: boolean;
          color: string;
        };
      }
    ];
  };

  series: {
    name: string;
    type: string;
    data: number[];
  }[];
};
