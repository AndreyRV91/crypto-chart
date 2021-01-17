import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

const initConfig = () => {
  return Enzyme.configure({ adapter: new Adapter() });
};

export { initConfig };
