import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { RouteProp } from '@react-navigation/native';

import Products from './index';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { MainParamsList } from '../../../@types/navigation';

type MockedRoute = RouteProp<MainParamsList, keyof MainParamsList>;

// Mocking useSelector hook
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

// Mocking the navigation prop
const mockNavigation: any = {
  navigate: jest.fn(),
  setOptions: jest.fn(),
};
const mockedRoute: MockedRoute = {
  key: 'mocked-route-key', // Provide a mock key
  name: 'Cart', // Provide a mock screen name
};

// Mocking useSelector hook
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

// Mocking useGetProductsQuery hook
jest.mock('../../services/modules/products', () => ({
  useGetProductsQuery: jest.fn(() => ({
    data: [],
    isLoading: false,
    isFetching: false,
  })),
}));

describe('Products', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls before each test
  });

  test('renders loading indicator when loading', () => {
    // Mocking isLoading as true
    jest
      .spyOn(require('react-redux'), 'useSelector')
      .mockReturnValueOnce({ cartItems: [] });
    jest
      .spyOn(require('../../services/modules/products'), 'useGetProductsQuery')
      .mockReturnValueOnce({
        data: [],
        isLoading: true,
        isFetching: false,
      });

    const { getByTestId } = render(
      <Provider store={store}>
        <Products navigation={mockNavigation} route={mockedRoute} />
      </Provider>,
    );
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  test('renders products list when not loading', async () => {
    jest
      .spyOn(require('react-redux'), 'useSelector')
      .mockReturnValueOnce({ cartItems: [] });
    jest
      .spyOn(require('../../services/modules/products'), 'useGetProductsQuery')
      .mockReturnValueOnce({
        data: [
          { id: 1, name: 'Product 1', price: 10 },
          { id: 2, name: 'Product 2', price: 20 },
        ],
        isLoading: false,
        isFetching: false,
      });

    const { getByText } = render(
      <Provider store={store}>
        <Products navigation={mockNavigation} route={mockedRoute} />
      </Provider>,
    );
    await waitFor(() => {
      expect(getByText('Product 1')).toBeTruthy();
      expect(getByText('Product 2')).toBeTruthy();
    });
  });

  test('navigates to cart screen when cart button is pressed', () => {
    // Mocking isLoading as true
    jest
      .spyOn(require('react-redux'), 'useSelector')
      .mockReturnValueOnce({ cartItems: [] });
    jest
      .spyOn(require('../../services/modules/products'), 'useGetProductsQuery')
      .mockReturnValueOnce({
        data,
        isLoading: false,
        isFetching: false,
      });
    const { getByTestId } = render(
      <Provider store={store}>
        <Products navigation={mockNavigation} route={mockedRoute} />
      </Provider>,
    );
    fireEvent.press(getByTestId(`cart-navigation-${data[0].id}`)); // Assuming the cart button have this ID
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Cart');
  });

  // You can write more tests to cover other functionality
});

const data = [
  {
    id: 1,
    colour: 'Black',
    name: 'Black Sheet Strappy Textured Glitter Bodycon Dress',
    price: 10,
    img: 'http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024',
  },
  {
    id: 2,
    colour: 'Stone',
    name: 'Stone Ribbed Strappy Cut Out Detail Bodycon Dress',
    price: 4,
    img: 'https://cdn-img.prettylittlething.com/3/6/5/a/365a5d1dce6a2b77b564379b302c9d83afccf33b_cmd2051_1.jpg?imwidth=1024',
  },
  {
    id: 3,
    colour: 'Black',
    name: 'Black Frill Tie Shoulder Bodycon Dress',
    price: 7.99,
    img: 'https://cdn-img.prettylittlething.com/d/c/3/3/dc337260f9ecefdb99a8c8e98cd73ccb1b79cea5_cmb6804_4.jpg?imwidth=1024',
  },
  {
    id: 5,
    colour: 'Red',
    name: 'Red Pin Stripe Belt T Shirt Dress',
    price: 17,
    img: 'https://cdn-img.prettylittlething.com/f/7/1/8/f718a4011ddf92f48aeefff6da0f475178694599_cly0842_1.jpg?imwidth=1024',
  },
];
