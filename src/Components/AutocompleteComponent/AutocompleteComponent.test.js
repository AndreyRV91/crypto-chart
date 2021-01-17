import { AutocompleteComponent } from '../AutocompleteComponent';

import { initConfig } from '../../utils/testConfig';
import { shallow } from 'enzyme';

initConfig();

const initialProps = {
  searchItems: [
    {
      id: 1,
      name: 'BTC',
      isChecked: false,
    },
    {
      id: 2,
      name: 'BTCS',
      isChecked: false,
    },
    {
      id: 3,
      name: 'LTC',
      isChecked: false,
    },
  ],
  placeholder: 'тикер',
};

describe('testing <AutocompleteComponent />', () => {
  it('should render input with expected placeholder', () => {
    const wrapper = shallow(<AutocompleteComponent {...initialProps} />);
    const input = wrapper.find('input');

    expect(input.props().placeholder).toBe('тикер');
  });

  it('should not render dropdown by default', () => {
    const wrapper = shallow(<AutocompleteComponent {...initialProps} />);
    expect(wrapper.exists('.AutocompleteComponent__dropdown')).toBe(false);
  });

  it('should render two rows in the dropdown when we write two letters that suits our search items', () => {
    const wrapper = shallow(<AutocompleteComponent {...initialProps} />);
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: 'BT' } });

    expect(wrapper.find('ul').children()).toHaveLength(2);
  });

  it('should render two rows in the dropdown when we write two letters that suits our search items', () => {
    const wrapper = shallow(<AutocompleteComponent {...initialProps} />);
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: 'BT' } });

    expect(wrapper.find('input').props().value).toBe('BT');
  });
});
