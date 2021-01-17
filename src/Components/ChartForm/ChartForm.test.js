import { ChartForm } from '../ChartForm';
import { CryptoChartContext } from '../../utils/context';

import { initConfig } from '../../utils/testConfig';
import { mount } from 'enzyme';

initConfig();

describe('testing <ChartForm />', () => {
  const tickers = [
    {
      id: 1,
      name: 'BTC',
      isChecked: true,
    },
    {
      id: 2,
      name: 'LTC',
      isChecked: false,
    },
    {
      id: 3,
      name: 'ETH',
      isChecked: false,
    },
  ];

  const dates = [new Date('01.01.2010'), new Date('02.02.2020')];

  it('should render one Tag when one ticker has been checked', () => {
    const onTickerToggle = jest.fn();
    const wrapper = mount(
      <CryptoChartContext.Provider value={{ onTickerToggle }}>
        <ChartForm tickerList={tickers} dates={dates} />
      </CryptoChartContext.Provider>
    );
    const tags = wrapper.find('Tag');

    expect(tags.length).toBe(1);
  });
});
