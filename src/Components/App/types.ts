export type TickersServer = {
  currency: string;
  price: string;
};

export type ChartServer = {
  currency: string;
  timestamps: string[];
  prices: string[];
};
