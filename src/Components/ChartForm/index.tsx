import React, { useContext } from 'react';
import { AutocompleteComponent } from 'Components/AutocompleteComponent';
import { DatePicker } from 'Components/DatePicker';
import { Tag } from 'Components/Tag';
import { TagType } from '../Tag/types';

import { ticker } from './types';
import './style.scss';
import { CryptoChartContext } from 'utils/context';
interface ChartFormProps {
  tickerList: ticker[];
  dates: Date[];
}

const ChartForm = ({ tickerList, dates }: ChartFormProps) => {
  const selectedTickers: ticker[] = tickerList.filter((ticker) => ticker.isChecked);
  const { onTickerToggle } = useContext(CryptoChartContext);

  return (
    <div className='ChartForm'>
      <div className='ChartForm__tickers'>
        <AutocompleteComponent searchItems={tickerList} placeholder={'Введите тикер валюты'} />

        <div className='ChartForm__selected'>
          {selectedTickers.map((selectedTicker) => {
            const preparedTag: TagType = { name: selectedTicker.name, id: selectedTicker.id };

            return <Tag tag={preparedTag} onToggle={onTickerToggle} key={selectedTicker.id} />;
          })}
        </div>
      </div>
      <DatePicker dates={dates} />
    </div>
  );
};

export { ChartForm };
