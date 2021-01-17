import React, { useState, useRef } from 'react';
import { AutocompleteComponentItem } from './AutocompleteComponentItem';
import { useOnClickOutside } from 'Hooks/useClickOutside';

import { searchItem } from './types';
import './style.scss';

interface AutocompleteComponentProps {
  searchItems: searchItem[];
  placeholder: string;
}

const AutocompleteComponent = ({ searchItems, placeholder }: AutocompleteComponentProps) => {
  const [foundItems, setItems] = useState<searchItem[]>([]);
  const [itemNameForSearch, setInputValue] = useState<string>('');
  const selectedItems: searchItem[] = searchItems.filter((searchItem) => searchItem.isChecked);
  const [isDropdownVisible, setDropdown] = useState<boolean>(false);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  const closeDropDown = (): void => {
    setDropdown(false);
  };

  useOnClickOutside(autocompleteRef, closeDropDown);

  const searchItem = (itemNameForSearch: string): searchItem[] => {
    return searchItems.filter((searchItem) =>
      searchItem.name.toLowerCase().includes(itemNameForSearch.toLowerCase())
    );
  };

  const handleInput = (newValue: string): void => {
    setInputValue(newValue);

    if (newValue.length >= 2) {
      setDropdown(true);
      const foundItems: searchItem[] = searchItem(newValue);
      setItems(foundItems);
    } else {
      setDropdown(false);
    }

    searchItem(newValue);
  };

  return (
    <div className='AutocompleteComponent'>
      <input
        type='search'
        autoComplete='off'
        className='AutocompleteComponent__input'
        placeholder={placeholder}
        onChange={({ target }) => handleInput(target.value)}
        onClick={() => {
          itemNameForSearch.length >= 2 && setDropdown(true);
        }}
        value={itemNameForSearch}
      />
      {isDropdownVisible && (
        <div className='AutocompleteComponent__dropdown' ref={autocompleteRef}>
          <ul>
            {foundItems.map((searchItem) => {
              return (
                <AutocompleteComponentItem
                  searchItem={searchItem}
                  key={searchItem.id.toString()}
                  isDisabled={selectedItems.length >= 2}
                />
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export { AutocompleteComponent };
