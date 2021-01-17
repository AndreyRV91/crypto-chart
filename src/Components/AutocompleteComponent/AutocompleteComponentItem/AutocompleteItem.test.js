import { AutocompleteComponentItem } from '../AutocompleteComponentItem';
import { CryptoChartContext } from '../../../utils/context';

import { initConfig } from '../../../utils/testConfig';
import { mount } from 'enzyme';

initConfig();

const initialProps = {
  searchItem: {
    id: 1,
    name: 'BTC',
    isChecked: true,
  },
  isDisabled: false,
};

describe('testing <AutocompleteComponentItem />', () => {
  it('should render AutocompleteComponentItem with name', () => {
    const onTickerToggle = jest.fn();
    const wrapper = mount(
      <CryptoChartContext.Provider value={{ onTickerToggle }}>
        <AutocompleteComponentItem {...initialProps} />
      </CryptoChartContext.Provider>
    );

    expect(wrapper.text()).toBe(initialProps.searchItem.name);
  });

  it('should send name when clicking on item', () => {
    const onTickerToggle = jest.fn();
    const wrapper = mount(
      <CryptoChartContext.Provider value={{ onTickerToggle }}>
        <AutocompleteComponentItem {...initialProps} />
      </CryptoChartContext.Provider>
    );

    wrapper.find('input').simulate('change');

    expect(onTickerToggle).toHaveBeenCalledTimes(1);
    expect(onTickerToggle).toHaveBeenCalledWith(initialProps.searchItem.name);
  });
});
