import React, { useContext } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { CryptoChartContext } from 'utils/context';

import './style.scss';

interface DatePickerWrapperProps {
  dates: Date[];
}

const DatePicker = ({ dates }: DatePickerWrapperProps) => {
  const { onChangeDate } = useContext(CryptoChartContext);

  return (
    <div className='DatePicker'>
      <DateRangePicker onChange={onChangeDate} value={dates} />
    </div>
  );
};

export { DatePicker };
