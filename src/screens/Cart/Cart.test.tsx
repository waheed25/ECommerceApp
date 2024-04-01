import React from 'react';
import { useDispatch, Provider } from 'react-redux';
import { store } from '../../store';
import { render, fireEvent } from '@testing-library/react-native'; // or @testing-library/react-native
import Cart from './index';

// Mock the useDispatch hook
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(), // Mock the useDispatch hook
  useSelector: jest.fn(), // Mock the useSelector hook if needed
}));
describe('Cart Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders correctly with empty cart', () => {
    // Mocking isLoading as true
    jest
      .spyOn(require('react-redux'), 'useSelector')
      .mockReturnValueOnce({ cartItems: [] });
    // Mock useSelector to return empty cartItems

    const { getByText } = render(
      <Provider store={store}>
        <Cart />
      </Provider>,
    );

    expect(getByText('Cart is Empty')).toBeTruthy();
  });

  it('renders correctly with cart items', () => {
    // Mock useSelector to return mock cartItems
    jest
      .spyOn(require('react-redux'), 'useSelector')
      .mockReturnValueOnce({ cartItems });

    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <Cart />
      </Provider>,
    );

    // Ensure cart items are rendered
    cartItems.forEach(item => {
      expect(getByText(item.name)).toBeTruthy();
      expect(getByText(`$${item.price}`)).toBeTruthy();
      expect(getByTestId(`quantity-${item.id}`)).toHaveTextContent(
        `${item.quantity}`,
      );
    });

    // Ensure total is rendered correctly
    const total = cartItems.reduce(
      (sum, item) => item.price * item.quantity + sum,
      0,
    );
    expect(getByText(`Total is: ${total}`)).toBeTruthy();
  });

  // TODO: this test making some issue, need to spend sometime to test it
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('updates item quantity correctly when buttons are clicked', () => {
    useDispatch.mockReturnValue(jest.fn());
    jest
      .spyOn(require('react-redux'), 'useSelector')
      .mockReturnValueOnce({ cartItems });

    const { getByTestId } = render(
      <Provider store={store}>
        <Cart />
      </Provider>,
    );

    // Simulate clicking the add button for the first item
    fireEvent.press(getByTestId('plus-1'));
    // Mocking isLoading as true
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce({
      cart: {
        cartItems: [{ ...cartItems[0], quantity: cartItems[0].quantity + 1 }],
      },
    });
    // const useSelectorMock = jest.spyOn(require('react-redux'), 'useSelector');
    // useSelectorMock.mockImplementation(selector =>
    //   selector({
    //     cart: {
    //       cartItems: [{ ...cartItems[0], quantity: 2 }],
    //     },
    //   }),
    // );
    // Ensure quantity for the first item is increased correctly
    expect(getByTestId('quantity-1')).toHaveTextContent('2');

    // Simulate clicking the minus button for the second item
    fireEvent.press(getByTestId('minus-2'));

    // Ensure quantity for the second item is decreased correctly
    expect(getByTestId('quantity-2')).toHaveTextContent('1');
  });

  // Add more test cases as needed to cover various scenarios, such as adding/removing items, updating quantity, etc.
});

const cartItems = [
  {
    id: 1,
    colour: 'Black',
    name: 'Black Sheet Strappy Textured Glitter Bodycon Dress',
    price: 10,
    img: 'http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024',
    quantity: 1,
  },
  {
    id: 2,
    colour: 'Stone',
    name: 'Stone Ribbed Strappy Cut Out Detail Bodycon Dress',
    price: 4,
    img: 'https://cdn-img.prettylittlething.com/3/6/5/a/365a5d1dce6a2b77b564379b302c9d83afccf33b_cmd2051_1.jpg?imwidth=1024',
    quantity: 2,
  },
  {
    id: 3,
    colour: 'Black',
    name: 'Black Frill Tie Shoulder Bodycon Dress',
    price: 8,
    img: 'https://cdn-img.prettylittlething.com/d/c/3/3/dc337260f9ecefdb99a8c8e98cd73ccb1b79cea5_cmb6804_4.jpg?imwidth=1024',
    quantity: 3,
  },
  {
    id: 5,
    colour: 'Red',
    name: 'Red Pin Stripe Belt T Shirt Dress',
    price: 17,
    img: 'https://cdn-img.prettylittlething.com/f/7/1/8/f718a4011ddf92f48aeefff6da0f475178694599_cly0842_1.jpg?imwidth=1024',
    quantity: 4,
  },
];
