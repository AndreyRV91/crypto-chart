import React, { useState, useEffect } from 'react';
import { ChartWrapper } from 'Components/ChartWrapper';
import { ChartForm } from 'Components/ChartForm';
import { ticker } from 'Components/ChartForm/types';
import { fetchJson } from 'utils/fetch-json';
import { CryptoChartContext } from 'utils/context';

import { TickersServer, ChartServer } from './types';
import './reset.css';
import './fonts.css';
import './style.scss';

const API_KEY = 'a3f16863e101b8c043b9af5d15beda81';

const DEFAULT_DATE_RANGE = [new Date(new Date().setDate(new Date().getDate() - 7)), new Date()];

function App() {
  const [tickers, setTickers] = useState<ticker[]>([]);
  const [dates, setDates] = useState<Date[]>(DEFAULT_DATE_RANGE);
  const [chartData, setChartData] = useState<ChartServer[]>(new Array<ChartServer>());

  const getTickers = async () => {
    const url = new URL('https://api.nomics.com/v1/prices');
    url.searchParams.set('key', API_KEY);

    try {
      const tickers: TickersServer[] = await fetchJson(url.toString());

      const newTickers: ticker[] = tickers.map((ticker, index) => {
        return { id: index, name: ticker.currency, isChecked: false };
      });
      setTickers(newTickers);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTickers();
  }, []);

  useEffect(() => {
    const getChart = async (tickerQuery: string, datesQuery: string[]) => {
      const url = new URL('https://api.nomics.com/v1/currencies/sparkline');
      url.searchParams.set('key', API_KEY);
      url.searchParams.set('ids', tickerQuery);
      url.searchParams.set('start', datesQuery[0]);
      url.searchParams.set('end', datesQuery[1]);

      try {
        const chartData: ChartServer[] = await fetchJson(url.toString());

        setChartData(chartData);
      } catch (error) {
        console.error(error);
      }
    };

    const tickerQuery = tickers
      .filter((ticker) => ticker.isChecked)
      .map((ticker) => ticker.name)
      .join(',');

    if (!tickerQuery || !dates) {
      setChartData([]);
      return;
    }

    const datesQuery = dates.map((date) => date.toISOString());

    getChart(tickerQuery, datesQuery);
  }, [tickers, dates]);

  const onTickerToggle = (name: string): void => {
    const checkedTickers = tickers.map((ticker) => {
      if (ticker.name === name) ticker.isChecked = !ticker.isChecked;
      return ticker;
    });

    setTickers(checkedTickers);
  };

  const onChangeDate = (dates: Date[]): void => {
    setDates(dates);
  };

  return (
    <CryptoChartContext.Provider value={{ onChangeDate, onTickerToggle }}>
      <div className='App'>
        <h1 className='App__header'>Графики криптовалют</h1>
        <ChartForm tickerList={tickers} dates={dates} />
        <ChartWrapper data={chartData} />
      </div>
    </CryptoChartContext.Provider>
  );
}

export default App;
