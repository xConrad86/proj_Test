import Sort from '../';
import Root from '../../../../Root';

//Set initial values for Sort and Filter Quantity
const initialState = {
  sort: {
    type: 'highestprice'
  },
  filterQuantity: {
    type: 5
  }
};

it('mounts without crashing', () => {
  const wrapped = mount(
    <Root initialState={initialState}>
      <Sort />
    </Root>
  );
  wrapped.unmount();
});
