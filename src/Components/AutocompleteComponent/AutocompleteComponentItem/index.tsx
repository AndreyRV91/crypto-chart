import React, { useContext } from 'react';
import { CryptoChartContext } from 'utils/context';

import { searchItem } from '../types';
import './style.scss';
interface AutocompleteComponentItemProps {
  searchItem: searchItem;
  isDisabled: boolean;
}

const AutocompleteComponentItem = ({ searchItem, isDisabled }: AutocompleteComponentItemProps) => {
  const { onTickerToggle } = useContext(CryptoChartContext);

  return (
    <li className='AutocompleteComponentItem'>
      <label className='AutocompleteComponentItem__checkbox-label'>
        <input
          type='checkbox'
          onChange={() => onTickerToggle(searchItem.name)}
          className='AutocompleteComponentItem__checkbox'
          checked={searchItem.isChecked}
          disabled={isDisabled && !searchItem.isChecked}
        />
        <div className='AutocompleteComponentItem__fake-checkbox' />
        <span>{searchItem.name}</span>
      </label>
    </li>
  );
};

export { AutocompleteComponentItem };
