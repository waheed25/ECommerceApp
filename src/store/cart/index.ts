import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Item {
  id: number;
  colour: string;
  img: string;
  name: string;
  price: number;
  quantity: number;
}

const updateItemInArray = (existingArray: Item[], newItem: Item): Item[] => {
  // Find the index of the item with the matching ID
  const index = existingArray.findIndex(item => item.id === newItem.id);

  // If the item with the matching ID is found
  if (index !== -1) {
    // Create a new array with the updated item at the same index
    return [
      ...existingArray.slice(0, index), // elements before the updated item
      newItem, // updated item
      ...existingArray.slice(index + 1), // elements after the updated item
    ];
  }

  // If the item with the matching ID is not found, return the original array
  return existingArray;
};

const slice = createSlice({
  name: 'cart',
  initialState: { cartItems: [] } as CartState,
  reducers: {
    // will add new items into cart
    addItemToCart: (state, action: PayloadAction<{ item: Item }>) => {
      const { item } = action.payload;
      if (item) {
        state.cartItems = [...state.cartItems, { ...item, quantity: 1 }];
      }
    },
    // will remove items from cart
    removeItemFromCart: (state, action: PayloadAction<{ item: Item }>) => {
      const { item } = action.payload;
      if (item) {
        state.cartItems = state.cartItems.filter(
          cartItem => cartItem.id !== item.id,
        );
      }
    },
    // update existing items from cart
    updateItemFromCart: (state, action: PayloadAction<{ item: Item }>) => {
      const { item } = action.payload;
      if (item) {
        state.cartItems = updateItemInArray(state.cartItems, item);
      }
    },
  },
});

export const { addItemToCart, removeItemFromCart, updateItemFromCart } =
  slice.actions;

export default slice.reducer;

export type CartState = {
  cartItems: Item[];
};
