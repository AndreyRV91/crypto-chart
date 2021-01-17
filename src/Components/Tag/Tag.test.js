import { Tag } from '../Tag';

import { initConfig } from '../../utils/testConfig';
import { shallow } from 'enzyme';

initConfig();

const mockTag = {
  id: 1,
  name: 'BTC',
};

describe('testing <Tag /> pressing close button', () => {
  it('should render Tag with text and send name in event after clicking on close button', () => {
    const onToggle = jest.fn();
    const wrapper = shallow(<Tag tag={mockTag} onToggle={onToggle} />);

    wrapper.find('.Tag__btn').simulate('pointerdown');

    expect(wrapper.text()).toBe('BTC');

    expect(onToggle.mock.calls.length).toEqual(1);
    expect(onToggle).toHaveBeenCalledWith('BTC');
  });
});
